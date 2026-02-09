# ========================================
# STAGE 1: Build
# ========================================
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ========================================
# TARGET: API (Native DB Bridge)
# ========================================
FROM alpine:3.19 AS api
WORKDIR /app
ENV NODE_ENV=production
ENV SERVICE_TYPE=api

# Install runtime dependencies and tools for stripping
RUN addgroup -S nodejs -g 1001 && \
    adduser -S nextjs -u 1001 -G nodejs && \
    apk add --no-cache libstdc++ libgcc binutils

# Copy Node binary from builder
COPY --from=builder /usr/local/bin/node /usr/bin/
COPY --from=builder /usr/lib/libstdc++.so.6 /usr/lib/
COPY --from=builder /usr/lib/libgcc_s.so.1 /usr/lib/

# Strip binary and cleanup
RUN strip /usr/bin/node && \
    apk del binutils

# Solo lo necesario de standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy database logic and seeding
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# Entrypoint setup
RUN chmod +x ./scripts/entrypoint.sh

USER nextjs
EXPOSE 3001
ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]

# ========================================
# TARGET: WEB (Native UI)
# ========================================
FROM alpine:3.19 AS web
WORKDIR /app
ENV NODE_ENV=production
ENV SERVICE_TYPE=web

# Install runtime dependencies and tools for stripping
RUN apk add --no-cache libstdc++ libgcc binutils

# Copy Node binary from builder
COPY --from=builder /usr/local/bin/node /usr/bin/

# Strip binary and cleanup
RUN strip /usr/bin/node && \
    apk del binutils && \
    addgroup -S nodejs -g 1001 && \
    adduser -S nextjs -u 1001 -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
RUN chmod +x ./scripts/entrypoint.sh

USER nextjs
EXPOSE 3001
ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]
