export interface InboundMessage {
  from: string;        // phone number E.164
  jid: string;         // full WhatsApp JID
  displayName: string;
  text: string;
  messageId: string;
  timestamp: number;
}

export interface OutboundText {
  to: string;          // phone number
  text: string;
}

export interface OutboundImage {
  to: string;
  imageBase64: string; // base64 PNG
  caption?: string;
}

export interface BridgeStatus {
  connected: boolean;
  phoneNumber: string | null;
  qrCode: string | null;  // base64 data URI when status=qr
  uptime: number;          // seconds
}
