FROM node:14.16.0-alpine3.12

ENV NODE_ENV=development

WORKDIR /src

COPY package*.json ./

# Install App & dependencies
RUN apk add --no-cache --virtual .build-deps && \
  npm i && \
  npm cache clean --force

ENV PATH=/src/node_modules/bin/$PATH

# Copy app source code
COPY . .

CMD ["npm", "run", "start:dev"]
