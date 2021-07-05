import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compress from 'compression';
import swaggerUi from 'swagger-ui-express';

import Router from './Router';
import swaggerSpecs from './plugins/swagger';
import errorMiddleware from './middleware/Error';

export default class Server {
  public port: number;
  public host: string;
  public app: express.Application;

  private static _intance: Server;
  private readonly httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 5000;
    this.host = process.env.HOST || 'localhost';

    this.httpServer = new http.Server(this.app);

    this.initMiddlewares();
    this.initRouters();

    this.errorHandling();
  }

  public static get instance(): Server {
    return this._intance || (this._intance = new this());
  }

  start(callback?: () => void): void {
    if (!callback) {
      console.info(`🌎 Web Server: http://${this.host}:${this.port}\n`);
    }

    this.httpServer.listen(this.port, callback);
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(helmet());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(morgan('dev'));
    this.app.use(compress());
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
    this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));
  }

  private errorHandling() {
    this.app.use(errorMiddleware);
  }

  private initRouters(): void {
    Router().forEach(({ router }) => this.app.use('/', router));
  }
}
