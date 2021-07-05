import path from 'path';

import swaggerJsdoc from 'swagger-jsdoc';

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 5000;

const BASE_URL = `http://${HOST}:${PORT}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Clean Architecture Principles',
      description: 'A simple API built with Nodejs + Typescript + Clean Architecture principles',
      license: {
        name: 'MIT',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      },
      contact: {
        name: 'DDD',
        email: 'info@email.com',
        url: BASE_URL
      }
    },
    servers: [
      {
        url: BASE_URL
      }
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        jwt: []
      }
    ]
  },
  apis: [path.join(path.resolve(__dirname), '../../routes/**/*.{ts,js}')]
};

export default swaggerJsdoc(options);
