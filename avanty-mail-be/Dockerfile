FROM node:20-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm ci --include=dev

# Copy source code and set ownership
COPY --chown=nodejs:nodejs . .

# Change ownership of /app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE ${PORT}

# Start in development mode with hot reload
CMD ["npm", "run", "dev"]