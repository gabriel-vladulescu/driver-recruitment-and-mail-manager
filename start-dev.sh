#!/bin/bash

echo "🚀 Starting Full Bolt Driver Stack in Development Mode..."
echo "📋 Backend + Frontend + Web Page + Database"
echo "🔧 Mode: Development with hot reload"
echo ""

# Create network if it doesn't exist
if ! docker network ls | grep -q "avanty-mail-network"; then
    echo "🔗 Creating avanty-mail-network..."
    docker network create avanty-mail-network
fi

# Start Backend (API + MySQL)
echo "🔧 Starting Backend (API + MySQL)..."
cd avanty-mail-be

if [ ! -f "../docker/backend/env/.env.development" ]; then
    echo "❌ Error: docker/backend/env/.env.development file not found!"
    echo "💡 Please create .env.development file with development configuration"
    exit 1
fi

docker-compose -f ../docker/backend/compose/docker-compose.base.yml -f ../docker/backend/compose/docker-compose.dev.yml --env-file ../docker/backend/env/.env.development up -d

echo "⏳ Waiting for backend to be ready..."
sleep 10

# Start Admin Frontend
echo "🎨 Starting Admin Frontend (avanty-mail-fe)..."
cd ../avanty-mail-fe

if [ ! -f "../docker/frontend/env/.env.development" ]; then
    echo "❌ Error: docker/frontend/env/.env.development file not found!"
    echo "💡 Please create .env.development file with development configuration"
    exit 1
fi

docker-compose -f ../docker/frontend/compose/docker-compose.dev.yml --env-file ../docker/frontend/env/.env.development up -d

# Start Web Page
echo "🌐 Starting Web Page..."
cd ../web-page

if [ ! -f "../docker/webpage/env/.env.development" ]; then
    echo "❌ Error: docker/webpage/env/.env.development file not found!"
    echo "💡 Please create .env.development file with development configuration"
    exit 1
fi

docker-compose -f ../docker/webpage/compose/docker-compose.dev.yml --env-file ../docker/webpage/env/.env.development up -d

echo ""
echo "✅ Full development stack started!"
echo ""
echo "🌐 Web Page: http://localhost:5173 (Development)"
echo "🎨 Admin Panel: http://localhost:5174 (avanty-mail-fe Development)"
echo "🔧 Backend API: http://localhost:4077"
echo "🗄️ Database: localhost:3306"
echo ""
echo "📋 Check all services: docker ps"
echo "📋 View logs: docker-compose logs -f (in respective directories)"
echo "🛑 Stop all: ./stop-dev.sh"

# Keep script running to show logs
echo ""
echo "📋 Showing real-time logs (Ctrl+C to stop)..."
echo "---"
cd ../avanty-mail-be
docker-compose -f ../docker/backend/compose/docker-compose.base.yml -f ../docker/backend/compose/docker-compose.dev.yml logs -f