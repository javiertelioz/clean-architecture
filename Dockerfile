FROM node:14.16.0-alpine3.12 AS builder

WORKDIR /src

COPY package*.json ./

COPY . .

RUN apk add --no-cache --virtual .build-deps git && \
  npm install typescript ts-node nodemon -g && \
  npm install --silent \
  npm run build && \
  npm run release

RUN rm -rf node_modules

FROM node:14.16.0-alpine3.12

WORKDIR /src

COPY package*.json ./

# Install App & dependencies
RUN apk add --no-cache --virtual .build-deps && \
  npm install pm2 -g && \
  npm install --production --silent \
  npm cache clean --force

COPY --from=builder /src/dist ./dist

EXPOSE 5000

COPY . .

CMD npm start
