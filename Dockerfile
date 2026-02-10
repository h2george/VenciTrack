# ========================================
# STAGE 1: Build
# ========================================
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
# Install ALL dependencies (dev included) for Vite build
RUN npm install --legacy-peer-deps
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build both API (Next.js) and Web (Vite)
RUN npm run build:api
RUN npm run build:web

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
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
RUN chmod +x ./scripts/entrypoint.sh
USER nextjs
EXPOSE 3001
ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]

# ========================================
# TARGET: WEB (Vite Static Site / Nginx)
# ========================================
FROM nginx:alpine AS web
# Copy Vite Build Output
COPY --from=builder /app/dist-web /usr/share/nginx/html
# Custom Nginx Config (Optional, using default for now or we can inject one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
