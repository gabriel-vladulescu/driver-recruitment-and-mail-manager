# Avanty Mail Platform

## Quick Start

**Windows (Git Bash):**
```bash
sh start.sh
```

**Linux/Ubuntu:**
```bash
./start.sh
```

## Projects

- **avanty-mail-be** - Backend API for email processing
- **avanty-mail-fe** - Frontend mail management dashboard  
- **web-page** - Presentation/landing page

## Database Setup

```bash
npm run db:reset  # Create default data
npm run db:seed   # Add mock data
```

## Individual Development

Run projects independently:
```bash
docker-compose up -d
```

## Demo Credentials

**Email:** admin@example.com  
**Password:** admin123