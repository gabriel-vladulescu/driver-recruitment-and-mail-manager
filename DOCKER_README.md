# Docker Setup Project

This project consists of three main applications:
- **avanty-mail-be**: Backend API for email management
- **avanty-mail-fe**: Frontend admin panel for email management  
- **web-page**: Public website for driver recruitment

## Quick Start

### Option 1: Run All Services Together (Recommended)

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your actual values (database passwords, email credentials, etc.)

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the applications:**
   - Avanty Mail Frontend: http://localhost:5173
   - Avanty Mail API: http://localhost:3000
   - Bolt Driver Website: http://localhost:8080
   - MySQL Database: localhost:3306

### Option 2: Run Individual Projects

#### Avanty Mail Backend + Database
```bash
cd avanty-mail-be
cp .env.example .env
# Edit .env with your values
docker-compose up -d
```

#### Avanty Mail Frontend
```bash
cd avanty-mail-fe
cp .env.example .env
# Edit .env with your values
docker-compose up -d
```

#### Bolt Driver Website
```bash
cd web-page
cp .env.example .env
# Edit .env with your values
docker-compose up -d
```

## Environment Configuration

### Required Environment Variables

#### Database (avanty-mail-be)
- `AVANTY_DB_ROOT_PASSWORD`: MySQL root password
- `AVANTY_DB_NAME`: Database name
- `AVANTY_DB_USER`: Database user
- `AVANTY_DB_PASSWORD`: Database password

#### Email Configuration (avanty-mail-be)
- `AVANTY_SMTP_HOST`: SMTP server hostname
- `AVANTY_SMTP_PORT`: SMTP server port
- `AVANTY_SMTP_USER`: SMTP username
- `AVANTY_SMTP_PASSWORD`: SMTP password
- `AVANTY_IMAP_HOST`: IMAP server hostname
- `AVANTY_IMAP_PORT`: IMAP server port
- `AVANTY_IMAP_USER`: IMAP username
- `AVANTY_IMAP_PASSWORD`: IMAP password

#### Security
- `AVANTY_JWT_SECRET`: JWT signing secret (use a strong random string)
- `AVANTY_ADMIN_EMAIL`: Admin user email
- `AVANTY_ADMIN_PASSWORD`: Admin user password

## Common Commands

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f avanty-mail-be
docker-compose logs -f avanty-mail-fe
docker-compose logs -f bolt-driver-website
```

### Stop services
```bash
docker-compose down
```

### Rebuild and restart
```bash
docker-compose down
docker-compose up -d --build
```

### Database operations
```bash
# Connect to MySQL
docker-compose exec avanty-mail-db mysql -u root -p

# Run database reset (from avanty-mail-be)
docker-compose exec avanty-mail-be npm run db:seed
```

## Development

### Making code changes
When you make changes to the code:

1. **For backend changes:**
   ```bash
   docker-compose restart avanty-mail-be
   # or rebuild if package.json changed
   docker-compose up -d --build avanty-mail-be
   ```

2. **For frontend changes:**
   ```bash
   docker-compose restart avanty-mail-fe
   # or rebuild
   docker-compose up -d --build avanty-mail-fe
   ```

### Health Checks
All services include health checks. Check status with:
```bash
docker-compose ps
```

## Troubleshooting

### Port conflicts
If ports are already in use, modify the port mappings in `.env`:
```env
AVANTY_MAIL_API_PORT=3001
AVANTY_MAIL_PORT=5174
WEBSITE_PORT=8081
```

### Database connection issues
1. Ensure the database container is healthy: `docker-compose ps`
2. Check database logs: `docker-compose logs avanty-mail-db`
3. Verify environment variables in `.env`

### Permission issues on Linux/Mac
```bash
sudo chown -R $USER:$USER .
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use strong passwords and secrets
3. Configure proper CORS origins
4. Consider using Docker Swarm or Kubernetes for orchestration
5. Set up proper SSL/TLS termination
6. Configure database backups
7. Set up monitoring and logging