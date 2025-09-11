const { PrismaClient } = require('@prisma/client');

// Create Prisma client instance
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'pretty',
});

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const connectDB = async () => {
  const maxAttempts = Number(process.env.DB_CONNECT_RETRIES || 5);
  const baseDelayMs = Number(process.env.DB_CONNECT_BACKOFF_MS || 500);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`📡 Connecting to PostgreSQL (attempt ${attempt}/${maxAttempts})`);
      await prisma.$connect();
      console.log('📊 PostgreSQL Connected: Database connection established successfully');

      // Test the connection
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Database connection test successful');
      return; // success
    } catch (error) {
      const isLast = attempt === maxAttempts;
      console.error(`❌ Database connection error (attempt ${attempt}):`, error.message);

      if (isLast) {
        console.error('🛑 Exhausted DB connection retries');
        process.exit(1);
      }

      const delay = baseDelayMs * Math.pow(2, attempt - 1); // exponential backoff
      console.log(`⏳ Retrying DB connection in ${delay} ms...`);
      await wait(delay);
    }
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🔌 Prisma connection closed through app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('🔌 Prisma connection closed through app termination');
  process.exit(0);
});

module.exports = { prisma, connectDB };
