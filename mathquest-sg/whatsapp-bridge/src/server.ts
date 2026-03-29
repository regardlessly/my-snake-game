import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import pino from 'pino';
import { getStatus, sendText, sendImage, phoneToJid, reconnect } from './baileys-client.js';
import type { OutboundText, OutboundImage } from './types.js';

const logger = pino({ name: 'server' });

export function createServer(): express.Application {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '10mb' })); // images can be large
  app.use(cors({
    origin: [/localhost/, /127\.0\.0\.1/],
    methods: ['GET', 'POST'],
  }));

  // GET /status - Returns BridgeStatus
  app.get('/status', (_req: Request, res: Response) => {
    res.json(getStatus());
  });

  // GET /health - Health check
  app.get('/health', (_req: Request, res: Response) => {
    const status = getStatus();
    res.json({ ok: true, connected: status.connected });
  });

  // POST /send - Send text message
  app.post('/send', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as OutboundText;
      if (!body.to || !body.text) {
        res.status(400).json({ error: 'Missing required fields: to, text' });
        return;
      }

      const jid = phoneToJid(body.to);
      logger.info({ to: body.to, jid }, 'Sending text message');
      await sendText(jid, body.text);

      logger.info({ to: body.to, jid }, 'Text message sent via API');
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });

  // POST /send-image - Send image message
  app.post('/send-image', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as OutboundImage;
      if (!body.to || !body.imageBase64) {
        res.status(400).json({ error: 'Missing required fields: to, imageBase64' });
        return;
      }

      const jid = phoneToJid(body.to);
      const imageBuffer = Buffer.from(body.imageBase64, 'base64');
      await sendImage(jid, imageBuffer, body.caption);

      logger.info({ to: body.to, hasCaption: !!body.caption }, 'Image message sent via API');
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });

  // POST /reconnect - Reconnect WhatsApp client
  app.post('/reconnect', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Reconnect requested via API');
      await reconnect();
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });

  // Error handling middleware
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error({ err: err.message, stack: err.stack }, 'Unhandled error');
    res.status(500).json({ error: err.message || 'Internal server error' });
  });

  return app;
}

export function startServer(app: express.Application, port: number): ReturnType<express.Application['listen']> {
  return app.listen(port, () => {
    logger.info({ port }, 'Bridge HTTP server listening');
  });
}
