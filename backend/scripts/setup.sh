#!/bin/bash

echo "🚀 Setting up TEACH Platform Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start database services
echo "🗄️ Starting database services..."
cd .. && docker-compose up -d postgres redis

# Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
sleep 10

# Go back to backend directory
cd backend

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before continuing"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run generate

# Run database migrations
echo "🗃️ Running database migrations..."
npm run migrate

# Seed database
echo "🌱 Seeding database..."
npm run seed

echo "✅ Setup complete!"
echo ""
echo "🎉 Your TEACH Platform backend is ready!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "The API will be available at: http://localhost:3001"
echo "Health check: http://localhost:3001/health"
echo ""
echo "Default admin login:"
echo "  Email: admin@teach.edu.br"
echo "  Password: admin123"