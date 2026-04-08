# Stage 1: Dependencies Installation Stage
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./

#RUN npm ci --no-audit --no-fund
RUN --mount=type=cache,target=/root/.npm \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  fi

# Stage 2: Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
ARG API_URL
ENV API_URL=${API_URL}
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Runner Stage (for production)
FROM node:22-alpine AS runner
WORKDIR /app
# Next.js standalone reads PORT, not APP_PORT (default 3000 if unset)
ARG PORT=3200
ENV PORT=${PORT}
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3200

CMD ["node", "server.js"]