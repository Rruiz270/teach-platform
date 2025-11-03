#!/usr/bin/env node

console.log('🚀 Starting TEACH Platform Backend for Railway...');

// Set production environment
process.env.NODE_ENV = 'production';

// Load environment variables
require('dotenv').config();

console.log('✅ Environment loaded');
console.log('📁 Working directory:', process.cwd());
console.log('🗄️ Database URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');

// Generate Prisma client
console.log('🔧 Generating Prisma client...');
const { execSync } = require('child_process');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.error('❌ Prisma generate failed:', error.message);
  process.exit(1);
}

// Build TypeScript
console.log('🔨 Building TypeScript...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ TypeScript compiled');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Start the application
console.log('🎯 Starting application...');
require('./dist/index.js');