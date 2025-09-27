#!/bin/bash

# TEACH Platform Development Helper

show_help() {
    echo "TEACH Platform Development Helper"
    echo ""
    echo "Usage: ./scripts/dev.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Start development server"
    echo "  reset     Reset database (drop + migrate + seed)"
    echo "  logs      Show database logs"
    echo "  test      Run tests"
    echo "  lint      Run linter"
    echo "  build     Build for production"
    echo "  help      Show this help"
    echo ""
}

start_dev() {
    echo "🚀 Starting TEACH Platform development server..."
    
    # Ensure databases are running
    echo "📊 Checking database services..."
    cd .. && docker-compose up -d postgres redis
    cd backend
    
    # Start the development server
    echo "⚡ Starting Node.js server..."
    npm run dev
}

reset_db() {
    echo "🗑️ Resetting database..."
    echo "⚠️  This will delete all data. Continue? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        # Reset database
        npx prisma migrate reset --force
        
        # Seed with fresh data
        npm run seed
        
        echo "✅ Database reset complete!"
    else
        echo "❌ Database reset cancelled"
    fi
}

show_logs() {
    echo "📋 Showing database logs..."
    cd .. && docker-compose logs -f postgres redis
}

run_tests() {
    echo "🧪 Running tests..."
    npm test
}

run_lint() {
    echo "🔍 Running linter..."
    npm run lint
}

build_production() {
    echo "🏗️ Building for production..."
    npm run build
    echo "✅ Build complete! Check the 'dist' directory."
}

# Parse command
case $1 in
    start)
        start_dev
        ;;
    reset)
        reset_db
        ;;
    logs)
        show_logs
        ;;
    test)
        run_tests
        ;;
    lint)
        run_lint
        ;;
    build)
        build_production
        ;;
    help|*)
        show_help
        ;;
esac