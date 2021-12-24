FROM node:lts-slim

# Create app directory
WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json ./
RUN apt-get update \
    && apt-get install -y openssl \
    && npm install

# Bundle app source
COPY . ./

RUN npm run build
