#!/bin/bash

echo "Stopping Application (Development)..."

# Stop Web Page
echo "Stopping Web Page..."
cd web-page
docker-compose down 2>/dev/null

# Stop Admin Frontend
echo "Stopping Admin Frontend..."
cd ../avanty-mail-fe
docker-compose down 2>/dev/null

# Stop Backend and Database
echo "Stopping Backend and Database..."
cd ../avanty-mail-be
docker-compose down 2>/dev/null

echo ""
echo "✅ All development services stopped!"

# Show remaining containers
echo "Remaining containers:"
docker ps --filter "name=webpage" --filter "name=AvantyMail" --filter "name=avantymailfe"