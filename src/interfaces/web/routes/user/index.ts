import { Router } from 'express';

import IRoute from '../IRoute';

import UserController from '../../controllers/UserController';

import AuthMiddleware from '../../middleware/Auth';
import validationMiddleware from '../../middleware/Validation';
import grantAccessMiddleware from '../../middleware/GrandAccess';

import { CreateUser, UpdateUser } from '../../validation/user';

export default class UserRouter implements IRoute {
  public path = '/users';
  public router = Router();

  private readonly routeController: UserController;

  constructor() {
    this.routeController = new UserController();

    this.initializeRoutes();
  }

  /**
   * @swagger
   *
   * tags:
   *  name: User
   *  description: API to manage your user.
   *
   * definitions:
   *  User:
   *    properties:
   *      id:
   *        type: number
   *        default: 1
   *      uuid:
   *        type: string
   *        default: c02976a0-8c53-40dd-81cb-96c1560163ba
   *      firstname:
   *        type: string
   *        default: John
   *      lastname:
   *        type: string
   *        default: Doe
   *      email:
   *        type: string
   *        default: john_doe@mail.com
   *      gender:
   *        type: string
   *        default: male
   *  UserUpdate:
   *    properties:
   *      firstname:
   *        type: string
   *        default: Jane
   *      lastname:
   *        type: string
   *        default: Doe
   *      email:
   *        type: string
   *        default: jane_doe@mail.com
   *      gender:
   *        type: string
   *        default: female
   *  UserCreate:
   *    properties:
   *      firstname:
   *        type: string
   *        default: John
   *      lastname:
   *        type: string
   *        default: Doe
   *      email:
   *        type: string
   *        default: john_doe@mail.com
   *      password:
   *        type: string
   *        default: John_123
   *      gender:
   *        description: Gender Allow (male, female)
   *        type: string
   *        default: male
   */
  private initializeRoutes() {
    /**
     * @swagger
     *
     * /users:
     *  get:
     *    summary: Lists all the users
     *    security:
     *      - jwt: []
     *    tags:
     *      - User
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: query
     *        name: page
     *        description: Number of page
     *        type: integer
     *        minimum: 1
     *        default: 1
     *      - in: query
     *        name: limit
     *        description: Number of user to return
     *        type: integer
     *        minimum: 10
     *        maximum: 100
     *        enum:
     *          10
     *          20
     *          50
     *          100
     *        default: 10
     *      - in: query
     *        name: filter
     *        description: Options for filtering the results
     *        type: object
     *        style: deepObject
     *        explode: true
     *    responses:
     *      200:
     *        description: The list of users.
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/definitions/User"
     *      400:
     *        description: Bad request.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      401:
     *        description: Authorization information is missing or invalid.
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
    this.router.get(
      this.path,
      [AuthMiddleware, grantAccessMiddleware('readAny', 'profile')],
      this.routeController.getAllUsers
    );
    /**
     * @swagger
     * /users:
     *  post:
     *    summary: Create a new user
     *    tags:
     *      - User
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/definitions/UserCreate"
     *    responses:
     *      201:
     *        description: The created user.
     *      400:
     *        description: Bad request.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      5XX:
     *        description: Unexpected error.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     */
    this.router.post(this.path, validationMiddleware(CreateUser), this.routeController.createUser);
    /**
     * @swagger
     * /users/{id}:
     *  get:
     *    summary: Get a user by id
     *    tags:
     *      - User
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The user id.
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: The user information.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/User"
     *      401:
     *        description: Authorization information is missing or invalid.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      404:
     *        description: A user not found.
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
    this.router.get(
      `${this.path}/:id`,
      [AuthMiddleware, grantAccessMiddleware('readAny', 'profile')],
      this.routeController.getUser
    );
    /**
     * @swagger
     * /users/{id}:
     *  put:
     *    summary: Updates a user
     *    tags:
     *      - User
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The user id.
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/definitions/UserUpdate"
     *    responses:
     *      204:
     *        description: Update was successful.
     *      400:
     *        description: Bad request.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      401:
     *        description: Authorization information is missing or invalid.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      404:
     *        description: A user not found.
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
    this.router.put(
      `${this.path}/:id`,
      [AuthMiddleware, grantAccessMiddleware('updateAny', 'profile'), validationMiddleware(UpdateUser, true)],
      this.routeController.updateUser
    );
    /**
     * @swagger
     * /users/{id}:
     *  delete:
     *    summary: Deletes a user by id
     *    tags:
     *      - User
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The user id.
     *    responses:
     *      204:
     *        description: The resource was deleted successfully.
     *      401:
     *        description: Authorization information is missing or invalid.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      404:
     *        description: A user not found.
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
    this.router.delete(
      `${this.path}/:id`,
      [AuthMiddleware, grantAccessMiddleware('deleteAny', 'profile')],
      this.routeController.deleteUser
    );
  }
}
