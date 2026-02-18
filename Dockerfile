# ========================================
# STAGE 1: Build
# ========================================
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# Ensure public dir exists for Next.js copy
RUN mkdir -p api/public

# Symlinks for node_modules
RUN ln -sf /app/node_modules /app/api/node_modules && \
    ln -sf /app/node_modules /app/client/node_modules

# Generate Prisma Client
RUN npx prisma generate --schema=./api/prisma/schema.prisma

# Build API and Web
RUN echo "Starting API Build..." && npm run build:api
RUN echo "Starting Web Build..." && npm run build:web

# ========================================
# TARGET: API (Next.js Backend)
# ========================================
FROM alpine:3.20 AS api
RUN apk add --no-cache nodejs libstdc++ libgcc && \
    addgroup -S nodejs -g 1001 && \
    adduser -S nextjs -u 1001 -G nodejs
WORKDIR /app
ENV NODE_ENV=production
ENV SERVICE_TYPE=api
# Copy Next.js Standalone build
COPY --from=builder --chown=nextjs:nodejs /app/api/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/api/.next/static ./api/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/api/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/api/prisma ./prisma
RUN sed -i 's/\r$//' ./scripts/entrypoint.sh
RUN chmod +x ./scripts/entrypoint.sh
USER nextjs
EXPOSE 3001
ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]

# ========================================
# TARGET: WEB (Vite Static Site / Nginx)
# ========================================
FROM nginx:alpine AS web
# Copy Vite Build Output from dist-web
COPY --from=builder /app/dist-web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
