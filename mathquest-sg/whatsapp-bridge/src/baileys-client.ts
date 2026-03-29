import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  type WASocket,
  type BaileysEventMap,
} from '@whiskeysockets/baileys';
import { USyncQuery, USyncUser } from '@whiskeysockets/baileys/lib/WAUSync/index.js';
import { Boom } from '@hapi/boom';
import QRCode from 'qrcode';
import qrcodeTerminal from 'qrcode-terminal';
import pino from 'pino';
import path from 'node:path';
import { forwardToBackend } from './webhook.js';
import type { BridgeStatus, InboundMessage } from './types.js';

const logger = pino({ name: 'baileys-client', level: 'info' });
const AUTH_DIR = path.resolve(process.cwd(), 'auth-state');

let socket: WASocket | null = null;
let connected = false;
let phoneNumber: string | null = null;
let qrCodeDataUri: string | null = null;
let retryCount = 0;
let startTime = Date.now();

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 2000;

// Cache LID -> phone number mappings
const lidToPhoneCache = new Map<string, string>();

// Track message IDs sent by the bot to avoid echo loops
const sentMessageIds = new Set<string>();
const MAX_SENT_TRACKING = 1000;

async function resolveLidToPhone(lid: string): Promise<string | null> {
  // Check cache first
  const cached = lidToPhoneCache.get(lid);
  if (cached) return cached;

  if (!socket) return null;

  try {
    const query = new USyncQuery().withContactProtocol();
    query.withUser(new USyncUser().withLid(lid));
    const results = await (socket as any).executeUSyncQuery(query);
    if (results?.list?.[0]?.id) {
      const phoneJid = results.list[0].id;
      const phone = `+${phoneJid.split('@')[0].split(':')[0]}`;
      lidToPhoneCache.set(lid, phone);
      logger.info({ lid, phone }, 'Resolved LID to phone');
      return phone;
    }
  } catch (err) {
    logger.warn({ lid, err: (err as Error).message }, 'Failed to resolve LID to phone');
  }
  return null;
}

function jidToPhone(jid: string): string {
  // JID format: 6512345678@s.whatsapp.net
  const num = jid.split('@')[0]!.split(':')[0]!;
  return `+${num}`;
}

function phoneToJid(phone: string): string {
  // If it's already a JID (contains @), return as-is
  if (phone.includes('@')) return phone;
  // Strip + and non-digits
  const digits = phone.replace(/\D/g, '');
  // Regular phone numbers are max 15 digits (E.164) but typically ≤13
  // LID numbers tend to be longer or have distinctive patterns
  // Safest: if > 13 digits, treat as LID
  if (digits.length > 13) {
    return `${digits}@lid`;
  }
  return `${digits}@s.whatsapp.net`;
}

function isGroupJid(jid: string): boolean {
  return jid.endsWith('@g.us');
}

async function handleConnectionUpdate(update: Partial<BaileysEventMap['connection.update']>): Promise<void> {
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    // Display QR in terminal
    qrcodeTerminal.generate(qr, { small: true });

    // Store as base64 data URI for the HTTP API
    try {
      qrCodeDataUri = await QRCode.toDataURL(qr);
      logger.info('QR code generated - scan with WhatsApp');
    } catch (err) {
      logger.error({ err }, 'Failed to generate QR data URI');
    }
  }

  if (connection === 'open') {
    connected = true;
    qrCodeDataUri = null;
    retryCount = 0;

    // Extract phone number from socket
    const me = socket?.user;
    if (me) {
      phoneNumber = jidToPhone(me.id);
      logger.info({ phoneNumber }, 'WhatsApp connected');
    } else {
      logger.info('WhatsApp connected (phone number not yet available)');
    }
  }

  if (connection === 'close') {
    connected = false;
    const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
    const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

    logger.warn(
      { statusCode, shouldReconnect, retryCount },
      'WhatsApp connection closed'
    );

    if (shouldReconnect && retryCount < MAX_RETRIES) {
      retryCount++;
      const delay = BASE_DELAY_MS * Math.pow(2, retryCount - 1);
      logger.info({ delay, retryCount }, 'Reconnecting...');
      setTimeout(() => { void connect(); }, delay);
    } else if (statusCode === DisconnectReason.loggedOut) {
      logger.info('Logged out from WhatsApp. Delete auth-state/ and restart to re-login.');
      phoneNumber = null;
    } else {
      logger.error({ retryCount: MAX_RETRIES }, 'Max retries reached. Call /reconnect to try again.');
    }
  }
}

async function handleMessagesUpsert(upsert: BaileysEventMap['messages.upsert']): Promise<void> {
  const { messages, type } = upsert;

  if (type !== 'notify') return;

  for (const msg of messages) {
    const jid = msg.key.remoteJid;
    if (!jid) continue;

    // Skip messages from self on regular JIDs (not LID)
    // Baileys v6 incorrectly marks incoming LID messages as fromMe
    if (msg.key.fromMe && jid.endsWith('@s.whatsapp.net')) continue;

    // Skip messages we sent (echo prevention)
    if (msg.key.id && sentMessageIds.has(msg.key.id)) continue;

    // Skip group messages
    if (isGroupJid(jid)) continue;

    // Extract text content
    let text: string | null = null;
    const messageContent = msg.message;
    if (!messageContent) continue;

    // Skip protocol messages (receipts, etc.)
    if (messageContent.protocolMessage) continue;

    if (messageContent.conversation) {
      text = messageContent.conversation;
    } else if (messageContent.extendedTextMessage?.text) {
      text = messageContent.extendedTextMessage.text;
    } else if (messageContent.imageMessage?.caption) {
      text = messageContent.imageMessage.caption;
    }

    // Skip non-text messages
    if (!text) continue;

    // Resolve LID to real phone number if needed
    let fromPhone = jidToPhone(jid);
    if (jid.endsWith('@lid')) {
      const resolved = await resolveLidToPhone(jid);
      if (resolved) {
        fromPhone = resolved;
      }
    }

    const inbound: InboundMessage = {
      from: fromPhone,
      jid,
      displayName: msg.pushName || 'Unknown',
      text,
      messageId: msg.key.id || `${Date.now()}`,
      timestamp: msg.messageTimestamp
        ? typeof msg.messageTimestamp === 'number'
          ? msg.messageTimestamp
          : Number(msg.messageTimestamp)
        : Math.floor(Date.now() / 1000),
    };

    logger.info(
      { from: inbound.from, rawJid: jid, displayName: inbound.displayName, textLength: text.length },
      'Received message'
    );

    void forwardToBackend(inbound);
  }
}

export async function connect(): Promise<void> {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  logger.info({ version }, 'Connecting to WhatsApp');

  socket = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: 'silent' }) as any,
    printQRInTerminal: false, // We handle QR ourselves
    generateHighQualityLinkPreview: false,
  });

  // Save credentials on update
  socket.ev.on('creds.update', saveCreds);

  // Handle connection updates
  socket.ev.on('connection.update', (update) => {
    void handleConnectionUpdate(update);
  });

  // Handle incoming messages
  socket.ev.on('messages.upsert', (upsert) => {
    logger.info({ type: upsert.type, count: upsert.messages?.length }, 'RAW messages.upsert event');
    for (const m of upsert.messages || []) {
      logger.info({
        fromMe: m.key.fromMe,
        remoteJid: m.key.remoteJid,
        participant: m.key.participant,
        hasMessage: !!m.message,
        msgTypes: m.message ? Object.keys(m.message) : [],
        pushName: m.pushName,
        verifiedBizName: (m as any).verifiedBizName,
        msgKey: JSON.stringify(m.key),
      }, 'RAW message detail');
    }
    handleMessagesUpsert(upsert);
  });

  startTime = Date.now();
}

export async function disconnect(): Promise<void> {
  if (socket) {
    logger.info('Disconnecting WhatsApp');
    socket.ev.removeAllListeners('connection.update');
    socket.ev.removeAllListeners('messages.upsert');
    socket.ev.removeAllListeners('creds.update');
    await socket.logout().catch(() => {
      // Ignore logout errors during shutdown
    });
    socket = null;
    connected = false;
    phoneNumber = null;
    qrCodeDataUri = null;
  }
}

export async function reconnect(): Promise<void> {
  if (socket) {
    socket.ev.removeAllListeners('connection.update');
    socket.ev.removeAllListeners('messages.upsert');
    socket.ev.removeAllListeners('creds.update');
    socket.end(undefined);
    socket = null;
  }
  connected = false;
  qrCodeDataUri = null;
  retryCount = 0;
  await connect();
}

export function getStatus(): BridgeStatus {
  return {
    connected,
    phoneNumber,
    qrCode: qrCodeDataUri,
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };
}

export async function sendText(jid: string, text: string): Promise<void> {
  if (!socket) {
    throw new Error('WhatsApp not connected');
  }
  const result = await socket.sendMessage(jid, { text });
  if (result?.key?.id) {
    sentMessageIds.add(result.key.id);
    // Prune old entries
    if (sentMessageIds.size > MAX_SENT_TRACKING) {
      const first = sentMessageIds.values().next().value;
      if (first) sentMessageIds.delete(first);
    }
  }
  logger.info({ jid, textLength: text.length }, 'Sent text message');
}

export async function sendImage(jid: string, imageBuffer: Buffer, caption?: string): Promise<void> {
  if (!socket) {
    throw new Error('WhatsApp not connected');
  }
  await socket.sendMessage(jid, {
    image: imageBuffer,
    caption: caption || undefined,
  });
  logger.info({ jid, imageSize: imageBuffer.length, hasCaption: !!caption }, 'Sent image message');
}

export { phoneToJid };
