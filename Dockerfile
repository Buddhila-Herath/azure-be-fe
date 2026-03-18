# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files for frontend
COPY package*.json ./
# Copy package files for gateway
COPY gateway/package*.json ./gateway/

# Install frontend dependencies
RUN npm ci

# Install gateway dependencies
WORKDIR /app/gateway
RUN npm ci

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/gateway/node_modules ./gateway/node_modules
COPY . .

# Build Next.js app
RUN npm run build

# Stage 3: Production runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/gateway ./gateway

# Set proper permissions
RUN chown nextjs:nodejs .

# Use nextjs user
USER nextjs

# Expose ports (frontend 3001, gateway 3000)
EXPOSE 3001 3000

# Health check for the container
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001 || exit 1

# Start both services using a proper init system
# Using tini for proper signal handling
ENTRYPOINT ["tini", "--"]

# Run gateway in background with proper logging and foreground for Next.js
CMD ["sh", "-c", "node gateway/server.js & npx next start -p 3001"]
