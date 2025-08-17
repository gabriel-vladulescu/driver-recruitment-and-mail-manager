# Multi-stage build for Vue.js application
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
FROM nginx:alpine AS production-stage

# Copy built app to nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY ../docker/webpage/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]