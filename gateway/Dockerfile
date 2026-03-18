FROM node:18-alpine

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

# Use node directly instead of npm script for better signal handling
CMD ["node", "server.js"]
