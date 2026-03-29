import 'dotenv/config';
import pino from 'pino';
import { connect, disconnect } from './baileys-client.js';
import { createServer, startServer } from './server.js';

const logger = pino({ name: 'mathquest-whatsapp-bridge' });

const BRIDGE_PORT = parseInt(process.env.BRIDGE_PORT || '3001', 10);

async function main(): Promise<void> {
  logger.info('Starting MathQuest WhatsApp Bridge');
  logger.info({
    port: BRIDGE_PORT,
    webhookUrl: process.env.WEBHOOK_URL || 'http://localhost:8000/whatsapp/webhook',
  }, 'Configuration');

  // Start Baileys WhatsApp client
  await connect();

  // Start Express HTTP server
  const app = createServer();
  const server = startServer(app, BRIDGE_PORT);

  // Graceful shutdown
  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'Shutting down...');

    // Close HTTP server
    server.close(() => {
      logger.info('HTTP server closed');
    });

    // Disconnect WhatsApp
    try {
      await disconnect();
      logger.info('WhatsApp disconnected');
    } catch (err) {
      logger.error({ err }, 'Error disconnecting WhatsApp');
    }

    process.exit(0);
  };

  process.on('SIGINT', () => { void shutdown('SIGINT'); });
  process.on('SIGTERM', () => { void shutdown('SIGTERM'); });
}

main().catch((err) => {
  logger.fatal({ err }, 'Failed to start bridge');
  process.exit(1);
});
