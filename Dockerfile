FROM node:lts-slim AS build

# Create app directory
WORKDIR /usr/src

# Files required by npm install
COPY package*.json ./
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
COPY --from=build /usr/src/package*.json ./

COPY locales ./locales
COPY prisma ./prisma

RUN apt-get update \
    && apt-get install --no-install-recommends -y procps openssl

# Start the app
EXPOSE 80
CMD ["node", "dist/run.js"]
