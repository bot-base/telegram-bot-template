FROM node:lts-slim AS base

# Install dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y openssl

# Create app directory
WORKDIR /usr/src

FROM base AS builder

# Files required by npm install
COPY package*.json ./
# Files required by prisma
COPY prisma ./prisma

# Install app dependencies
RUN npm ci \
    && npx prisma generate

# Bundle app source
COPY . .

# Build app
RUN npm run typecheck \
    && npm prune --omit=dev

FROM base AS runner

# Copy from build image
COPY --from=builder /usr/src/node_modules ./node_modules
COPY --from=builder /usr/src/src ./src
COPY --from=builder /usr/src/package*.json ./
COPY --from=builder /usr/src/tsconfig*.json ./

COPY locales ./locales
COPY prisma ./prisma

USER node

# Start the app
EXPOSE 80
CMD ["npm", "run", "start:force"]
