// Simple test script to verify backend setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

console.log('🧪 Testing backend setup...');

// Test basic server creation
try {
  const app = express();
  console.log('✅ Express app created successfully');
  
  // Test middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  console.log('✅ Middleware loaded successfully');
  
  // Test basic route
  app.get('/test', (req, res) => {
    res.json({ message: 'Backend setup is working!' });
  });
  console.log('✅ Routes configured successfully');
  
  console.log('🎉 Backend setup test completed successfully!');
  console.log('📝 Next steps:');
  console.log('   1. Start MongoDB: net start MongoDB (Windows)');
  console.log('   2. Run: npm run dev');
  console.log('   3. Test: curl http://localhost:6969/health');
  
} catch (error) {
  console.error('❌ Backend setup test failed:', error.message);
  process.exit(1);
}
