FROM node:lts-slim AS build

# Create app directory
WORKDIR /usr/src

# Files required by npm install
COPY package.json package-lock.json ./
# Files required by prisma
COPY prisma ./prisma

# Install app dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y openssl \
    && npm ci

# Bundle app source
COPY . .

RUN npm run build \
    && npm prune --production

FROM node:lts-slim

# Create app directory
WORKDIR /usr/src

# Copy from build image
COPY --from=build /usr/src/node_modules ./node_modules
COPY --from=build /usr/src/dist ./dist

# Files required by npm install
COPY package.json package-lock.json ./
COPY locales ./locales
COPY prisma ./prisma

RUN apt-get update \
    && apt-get install --no-install-recommends -y procps openssl \
    && npx prisma generate

# Start the app
CMD ["node", "dist/run.js"]
