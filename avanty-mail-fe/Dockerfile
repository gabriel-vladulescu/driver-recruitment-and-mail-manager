FROM node:20-alpine

# Install wget for health checks and create non-root user for security
RUN apk add --no-cache wget && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm ci --include=dev

# Copy source code and set ownership
COPY --chown=nodejs:nodejs . .

# Create .vite directory with proper permissions
RUN mkdir -p node_modules/.vite && \
    chown -R nodejs:nodejs node_modules/.vite && \
    chmod -R 755 node_modules/.vite

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE ${APP_PORT}

# Clear Vite cache and start in development mode with hot reload
CMD ["sh", "-c", "rm -rf node_modules/.vite/* 2>/dev/null || true && npm run dev"]