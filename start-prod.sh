#!/bin/bash

echo "🌟 Starting Full Bolt Driver Stack in Production Mode..."
echo "📋 Backend + Frontend + Web Page + Database"
echo "🔧 Mode: Production optimized builds"
echo ""

# Create network if it doesn't exist
if ! docker network ls | grep -q "avanty-mail-network"; then
    echo "🔗 Creating avanty-mail-network..."
    docker network create avanty-mail-network
fi

# Start Backend (API + MySQL)
echo "🔧 Starting Backend (API + MySQL)..."
cd avanty-mail-be

if [ ! -f ".env.production" ]; then
    echo "❌ Error: avanty-mail-be/.env.production file not found!"
    echo "💡 Please create .env.production file with production configuration"
    exit 1
fi

docker-compose -f ../docker/backend/compose/docker-compose.base.yml -f ../docker/backend/compose/docker-compose.prod.yml --env-file ../docker/backend/env/.env.production up -d

echo "⏳ Waiting for backend to be ready..."
sleep 15

# Start Admin Frontend
echo "🎨 Starting Admin Frontend (avanty-mail-fe)..."
cd ../avanty-mail-fe

if [ ! -f "../docker/frontend/env/.env.production" ]; then
    echo "❌ Error: docker/frontend/env/.env.production file not found!"
    echo "💡 Please create .env.production file with production configuration"
    exit 1
fi

docker-compose -f ../docker/frontend/compose/docker-compose.prod.yml --env-file ../docker/frontend/env/.env.production up -d

# Start Web Page
echo "🌐 Starting Web Page..."
cd ../web-page

if [ ! -f "../docker/webpage/env/.env.production" ]; then
    echo "❌ Error: docker/webpage/env/.env.production file not found!"
    echo "💡 Please create .env.production file with production configuration"
    exit 1
fi

docker-compose -f ../docker/webpage/compose/docker-compose.prod.yml --env-file ../docker/webpage/env/.env.production up -d

echo ""
echo "✅ Full production stack started!"
echo ""
echo "🌐 Web Page: http://localhost:8080 (Production)"
echo "🎨 Admin Panel: http://localhost:8081 (avanty-mail-fe Production)"
echo "🔧 Backend API: http://localhost:4000"
echo "🗄️ Database: localhost:3306"
echo ""
echo "📋 Check all services: docker ps"
echo "📋 View backend logs: cd avanty-mail-be && docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml logs -f"
echo "📋 View frontend logs: cd avanty-mail-fe && docker-compose -f docker-compose.prod.yml logs -f"
echo "📋 View webpage logs: cd web-page && docker-compose logs -f"
echo "🛑 Stop all: ./stop-prod.sh"