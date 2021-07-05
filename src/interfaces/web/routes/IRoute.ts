import { Router } from 'express';

/**
 * Route Interface
 */
export default interface IRoute {
  path: string;
  router: Router;
}
