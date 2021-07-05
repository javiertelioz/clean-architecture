import { Request, Response } from 'express';

import HelloController from '../../../src/interfaces/web/controllers/HelloController';

describe('Hello Controller', () => {
  const helloController = new HelloController();
  const mockRequest: Partial<Request> = {
    query: {},
    params: {},
    headers: {}
  };
  const mockResponse: Partial<Response> = {
    json: jest.fn(),
    send: jest.fn(),
    status: jest.fn()
  };

  beforeEach(() => ({ mockRequest, mockResponse }));

  test('Request without name param', async () => {
    // given
    const expectedResponse = {
      message: 'Hello world!'
    };

    // when
    helloController.sayHello(mockRequest as Request, mockResponse as Response);

    // then
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  test('Request with name param, say "Hello John!"', async () => {
    // given
    mockRequest.params = { name: 'John' };

    const expectedResponse = {
      message: 'Hello John!'
    };

    // when
    helloController.sayHello(mockRequest as Request, mockResponse as Response);

    // then
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });
});
