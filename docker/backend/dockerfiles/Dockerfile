# Multi-stage build for Node.js API
FROM node:20-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production-stage

WORKDIR /app

# Copy package files for production install
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from build stage
COPY --from=build-stage /app/dist ./dist

# Copy any static files if needed
COPY --from=build-stage /app/src ./src

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]