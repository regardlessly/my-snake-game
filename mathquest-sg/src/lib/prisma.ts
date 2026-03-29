import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString =
    process.env.DATABASE_TCP_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_TCP_URL or DATABASE_URL must be set");
  }

  if (
    connectionString.startsWith("postgres://") ||
    connectionString.startsWith("postgresql://")
  ) {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  }

  return new PrismaClient({ accelerateUrl: connectionString });
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = globalForPrisma.prisma ?? createPrismaClient();
    globalForPrisma.prisma = client;
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
