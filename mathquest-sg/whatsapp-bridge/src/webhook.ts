import axios from 'axios';
import pino from 'pino';
import type { InboundMessage } from './types.js';

const logger = pino({ name: 'webhook' });

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:8000/whatsapp/webhook';
const BRIDGE_SECRET = process.env.BRIDGE_SECRET || 'mathquest-bridge-secret';

export async function forwardToBackend(message: InboundMessage): Promise<void> {
  try {
    logger.info(
      { from: message.from, messageId: message.messageId },
      'Forwarding message to backend'
    );

    const response = await axios.post(WEBHOOK_URL, message, {
      headers: {
        'Content-Type': 'application/json',
        'X-Bridge-Secret': BRIDGE_SECRET,
      },
      timeout: 30_000, // 30 seconds - tutor responses may take time
    });

    logger.info(
      { status: response.status, messageId: message.messageId },
      'Message forwarded successfully'
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      logger.error(
        {
          messageId: message.messageId,
          status: err.response?.status,
          statusText: err.response?.statusText,
          url: WEBHOOK_URL,
          code: err.code,
        },
        'Failed to forward message to backend'
      );
    } else {
      logger.error(
        { err, messageId: message.messageId },
        'Unexpected error forwarding message'
      );
    }
    // Don't throw - we don't want webhook failures to crash the bridge
  }
}
