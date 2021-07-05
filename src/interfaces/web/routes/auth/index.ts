import { Router } from 'express';

import IRoute from '../IRoute';

import AuthController from '../../controllers/AuthController';
import validationMiddleware from '../../middleware/Validation';

import Login from '../../validation/auth';

export default class UserRouter implements IRoute {
  public path = '/auth';
  public router = Router();

  private readonly routeController: AuthController;

  constructor() {
    this.routeController = new AuthController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     *
     * tags:
     *  name: Auth
     *  description: API to manage your login.
     *
     * definitions:
     *  Login:
     *    properties:
     *      email:
     *        type: string
     *        default: john_doe@mail.com
     *      password:
     *        type: string
     *        default: John_123
     *
     * /auth/login:
     *  post:
     *    summary: Auth user (jwt)
     *    tags:
     *      - Auth
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/definitions/Login"
     *    responses:
     *      200:
     *        description: Successful login.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/SucessTokenResponse"
     *      400:
     *        description: Bad request.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      50X:
     *        description: Unexpected error.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     */
    this.router.post(`${this.path}/login`, validationMiddleware(Login), this.routeController.getAuthorization);
  }
}
