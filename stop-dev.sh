#!/bin/bash

echo "🛑 Stopping Full Bolt Driver Stack (Development)..."

# Stop Web Page
echo "🌐 Stopping Web Page..."
cd web-page
docker-compose -f ../docker/webpage/compose/docker-compose.dev.yml down 2>/dev/null

# Stop Admin Frontend
echo "🎨 Stopping Admin Frontend..."
cd ../avanty-mail-fe
docker-compose -f ../docker/frontend/compose/docker-compose.dev.yml down 2>/dev/null

# Stop Backend and Database
echo "🔧 Stopping Backend and Database..."
cd ../avanty-mail-be
docker-compose -f ../docker/backend/compose/docker-compose.base.yml -f ../docker/backend/compose/docker-compose.dev.yml down 2>/dev/null

echo ""
echo "✅ All development services stopped!"

# Show remaining containers
echo "📋 Remaining Bolt Driver containers:"
docker ps --filter "name=bolt-driver" --filter "name=avanty-mail"