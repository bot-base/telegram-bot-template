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

# Type check app
RUN npm run typecheck

FROM base AS runner

# Bundle app source
COPY . .

# Install only production app dependencies
RUN npm ci --omit=dev

# Copy Prisma client
COPY --from=builder /usr/src/node_modules/.prisma ./node_modules/.prisma

USER node

# Start the app
EXPOSE 80
CMD ["npm", "run", "start:force"]
