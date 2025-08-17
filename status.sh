#!/bin/bash

echo "📋 Bolt Driver Stack Status"
echo "=========================="

# Check if network exists
if docker network ls | grep -q "avanty-mail-network"; then
    echo "🔗 Network: avanty-mail-network ✅"
else
    echo "🔗 Network: avanty-mail-network ❌"
fi

echo ""
echo "🐳 Running Containers:"
echo "----------------------"
docker ps --filter "name=bolt-driver" --filter "name=avanty-mail" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🌐 Service URLs:"
echo "---------------"

# Check if containers are running and show URLs
if docker ps --filter "name=bolt-driver-website" --filter "status=running" | grep -q bolt-driver-website; then
    if docker ps --filter "name=bolt-driver-website-dev" --filter "status=running" | grep -q bolt-driver-website-dev; then
        echo "Web Page: http://localhost:5173 (Development) ✅"
    elif docker ps --filter "name=bolt-driver-website-prod" --filter "status=running" | grep -q bolt-driver-website-prod; then
        echo "Web Page: http://localhost:8080 (Production) ✅"
    else
        echo "Web Page: http://localhost:8080 (Legacy) ✅"
    fi
else
    echo "Web Page: Not running ❌"
fi

if docker ps --filter "name=avanty-mail-frontend" --filter "status=running" | grep -q avanty-mail-frontend; then
    if docker ps --filter "name=avanty-mail-frontend-dev" --filter "status=running" | grep -q avanty-mail-frontend-dev; then
        echo "Admin Panel: http://localhost:5174 (Development) ✅"
    elif docker ps --filter "name=avanty-mail-frontend-prod" --filter "status=running" | grep -q avanty-mail-frontend-prod; then
        echo "Admin Panel: http://localhost:8081 (Production) ✅"
    fi
else
    echo "Admin Panel: Not running ❌"
fi

if docker ps --filter "name=avanty-mail-api" --filter "status=running" | grep -q avanty-mail-api; then
    if docker ps --filter "name=avanty-mail-api-dev" --filter "status=running" | grep -q avanty-mail-api-dev; then
        echo "Backend API: http://localhost:4077 (Development) ✅"
    elif docker ps --filter "name=avanty-mail-api-prod" --filter "status=running" | grep -q avanty-mail-api-prod; then
        echo "Backend API: http://localhost:4000 (Production) ✅"
    fi
else
    echo "Backend API: Not running ❌"
fi

if docker ps --filter "name=avanty-mail-mysql" --filter "status=running" | grep -q avanty-mail-mysql; then
    echo "Database: localhost:3306 ✅"
else
    echo "Database: Not running ❌"
fi

echo ""
echo "🔧 Quick Commands:"
echo "-----------------"
echo "./start-dev.sh   - Start development stack"
echo "./start-prod.sh  - Start production stack"
echo "./stop-dev.sh    - Stop development stack"
echo "./stop-prod.sh   - Stop production stack"
echo "./status.sh      - Show this status"