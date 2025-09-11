const { PrismaClient } = require('@prisma/client');

// Create Prisma client instance
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'pretty',
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('📊 PostgreSQL Connected: Database connection established successfully');
    
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection test successful');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
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
