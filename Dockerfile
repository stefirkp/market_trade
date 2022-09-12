# https://nextjs.org/docs/deployment#docker-image
# changed yarn to npm

# TODO: also install `sharp` as recommended, figure out which stage to place `npm install sharp`
# here: https://nextjs.org/docs/api-reference/next/image#built-in-loaders
# and here: https://nextjs.org/docs/deployment#nodejs-server

# https://hub.docker.com/_/node
ARG BASE_IMAGE=node:16.13.0-alpine

# Install dependencies only when needed
FROM $BASE_IMAGE AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json .npmrc ./

RUN npm ci
# https://github.com/vercel/next.js/discussions/30468
RUN npm i @next/swc-linux-x64-gnu --no-save

# Rebuild the source code only when needed
FROM $BASE_IMAGE AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG PORT
ARG BASE_URL
ARG NEXT_PUBLIC_SERVICE_ENDPOINT
ARG SERVER_SIDE_SERVICE_ENDPOINT
RUN npm run build && npm install --production --ignore-scripts

# Production image, copy all the files and run next
FROM $BASE_IMAGE AS runner
WORKDIR /app

# Port config
ARG PORT
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE ${PORT}

ENV PORT ${PORT}

CMD ["node_modules/.bin/next", "start", "-p", "${PORT}"]
