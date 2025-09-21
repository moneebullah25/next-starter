# ---- Base Stage ----
FROM node:22.14.0-alpine AS base
WORKDIR /app
RUN corepack enable && echo "y" | corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./

# ---- Dependencies Stage ----
FROM base AS deps
# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# ---- Builder Stage ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# ---- Production Dependencies Stage ----
FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --prod

# ---- Production Stage ----
FROM node:22.14.0-alpine AS production
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN corepack enable && echo "y" | corepack prepare pnpm@latest --activate
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"
CMD ["pnpm", "run", "start"]

# ---- Development Stage ----
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]
