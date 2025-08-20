#!/bin/bash

echo "App Status"
echo "=========================="

# Check if network exists
if docker network ls | grep -q "avanty-network"; then
    echo "Network: avanty-network ✅"
else
    echo "Network: avanty-network ❌"
fi

echo ""
echo "Running Containers:"
echo "----------------------"
docker ps --filter "name=webpage" --filter "name=AvantyMail" --filter "name=avantymailfe" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "Service URLs:"
echo "---------------"

# Check if containers are running and show URLs
if docker ps --filter "name=webpage" --filter "status=running" | grep -q webpage; then
    echo "Web Page: http://localhost:5174 ✅"
else
    echo "Web Page: Not running ❌"
fi

if docker ps --filter "name=AvantyMail_Frontend" --filter "status=running" | grep -q AvantyMail_Frontend; then
    echo "Admin Panel: http://localhost:5173 ✅"
elif docker ps --filter "name=avantymailfe" --filter "status=running" | grep -q avantymailfe; then
    echo "Admin Panel: http://localhost:5173 ✅"
else
    echo "Admin Panel: Not running ❌"
fi

if docker ps --filter "name=AvantyMail_Backend" --filter "status=running" | grep -q AvantyMail_Backend; then
    echo "Backend API: http://localhost:4000 ✅"
else
    echo "Backend API: Not running ❌"
fi

if docker ps --filter "name=AvantyMail_MySQL" --filter "status=running" | grep -q AvantyMail_MySQL; then
    echo "Database: localhost:3306 ✅"
else
    echo "Database: Not running ❌"
fi

echo ""
echo "🔧 Quick Commands:"
echo "-----------------"
echo "./start.sh        - Start development stack"
echo "./stop.sh         - Stop development stack" 
echo "./status.sh       - Show this status"