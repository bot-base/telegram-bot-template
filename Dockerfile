FROM node:lts-slim AS build

# Create app directory
WORKDIR /usr/src

# Install pnpm
RUN apt-get update \
    && apt-get install -y curl \
    && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Install app dependencies
# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./
RUN apt-get install -y openssl \
    && pnpm install --frozen-lockfile

# Bundle app source
COPY . ./

RUN npm run build

FROM node:lts-slim

# Create app directory
WORKDIR /usr/src

# Install pnpm
RUN apt-get update \
    && apt-get install -y curl \
    && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Install production dependencies
COPY package.json pnpm-lock.yaml ./
RUN apt-get install -y openssl \
    && pnpm install --frozen-lockfile --prod

# Copy build
COPY --from=build /usr/src/dist ./dist

# Start the app
CMD npm start