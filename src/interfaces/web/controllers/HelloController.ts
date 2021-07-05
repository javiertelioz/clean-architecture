import { Request, Response } from 'express';

import SayHello from '../../../application/use_cases/hello/SayHello';

export default class HelloController {
  /**
   * Say Hello
   *
   * @param {Request} req Request object
   * @param {Response} res Response Object
   *
   * @returns {Response} response
   */
  sayHello(req: Request, res: Response): Response {
    const { name } = req.params;

    return res.json({
      message: SayHello(name)
    });
  }
}
