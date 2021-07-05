import { Request, Response } from 'express';

export default class IndexController {
  /**
   * Welcome API
   *
   * @param {Request} req Request object
   * @param {Response} res Response Object
   */
  async welcome(req: Request, res: Response): Promise<Response> {
    return res.json({
      status: true,
      message: 'A simple API built with Node.js + Clean Architecture principles'
    });
  }
}
