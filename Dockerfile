# Build stage
FROM node:16-alpine AS builder

# If install error -> sudo apt install python3-pip python3-dev unixodbc-dev

ARG NODE_PORT
ENV NODE_PORT=$NODE_PORT

WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
# COPY src src
COPY . ./
RUN npm run build


# Production
FROM node:16-alpine
ENV NODE_ENV=production
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install --production
COPY --from=builder /home/node/app/dist ./dist

COPY --chown=node:node .env .

EXPOSE ${NODE_PORT}
CMD [ "node", "dist/index.js" ]
