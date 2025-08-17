# Docker Configuration

Centralized Docker configurations for all Bolt Driver services.

## 📁 Structure

```
docker/
├── backend/           # avanty-mail-be configurations
│   ├── compose/
│   │   ├── docker-compose.base.yml    # MySQL + shared services
│   │   ├── docker-compose.dev.yml     # Development API
│   │   └── docker-compose.prod.yml    # Production API
│   ├── dockerfiles/
│   │   ├── Dockerfile                 # Production backend image
│   │   └── Dockerfile.dev             # Development backend image
│   └── env/
│       ├── .env.development           # Dev environment vars
│       └── .env.production            # Prod environment vars
├── frontend/          # avanty-mail-fe configurations  
│   ├── compose/
│   │   ├── docker-compose.dev.yml     # Development frontend
│   │   └── docker-compose.prod.yml    # Production frontend
│   ├── dockerfiles/
│   │   ├── Dockerfile                 # Production frontend image
│   │   └── Dockerfile.dev             # Development frontend image
│   ├── nginx/
│   │   └── nginx.conf                 # Nginx config for production
│   └── env/
│       ├── .env.development           # Dev environment vars
│       └── .env.production            # Prod environment vars
└── webpage/           # web-page configurations
    ├── compose/
    │   ├── docker-compose.dev.yml     # Development webpage
    │   └── docker-compose.prod.yml    # Production webpage
    ├── dockerfiles/
    │   ├── Dockerfile                 # Production webpage image
    │   └── Dockerfile.dev             # Development webpage image
    ├── nginx/
    │   └── nginx.conf                 # Nginx config for production
    └── env/
        ├── .env.development           # Dev environment vars
        └── .env.production            # Prod environment vars
```

## 🚀 Usage

Use the root-level scripts which automatically reference these configurations:

```bash
# Start all services in development
./start-dev.sh

# Start all services in production  
./start-prod.sh

# Check status
./status.sh

# Stop services
./stop-dev.sh   # or ./stop-prod.sh
```

## 🌐 Service Ports

### Development
- Backend API: `http://localhost:4077`
- Admin Panel: `http://localhost:5174`
- Web Page: `http://localhost:5173`
- Database: `localhost:3306`

### Production
- Backend API: `http://localhost:4000`
- Admin Panel: `http://localhost:8081`
- Web Page: `http://localhost:8080`
- Database: `localhost:3306`

## 🔧 Manual Usage

If you need to run individual services:

```bash
# Backend development
cd avanty-mail-be
docker-compose -f ../docker/backend/compose/docker-compose.base.yml \
               -f ../docker/backend/compose/docker-compose.dev.yml \
               --env-file ../docker/backend/env/.env.development up

# Frontend development
cd avanty-mail-fe  
docker-compose -f ../docker/frontend/compose/docker-compose.dev.yml \
               --env-file ../docker/frontend/env/.env.development up

# Web page development
cd web-page
docker-compose -f ../docker/webpage/compose/docker-compose.dev.yml \
               --env-file ../docker/webpage/env/.env.development up
```