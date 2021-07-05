import request from 'supertest';

import Server from '../../src/interfaces/web/Server';

/*beforeAll(async () => {
  process.env.PORT = '5001';
  // process.env.MONGO_URI = 'mongodb://mongo:27017/DDD-test'

  const callback = () => {};

  const server = Server.instance;
  const mongoose = MongooseAdapter.instance;

  await mongoose.run(callback);
  server.start(callback);
});

afterAll(() => {
  MongooseAdapter.instance.mongoose.disconnect();
});*/

describe('Authentication Controller', () => {
  test('Success get access token', async () => {
    // given
    const server = Server.instance;
    const result = await request(server.app).post('/auth/login').set('Accept', 'application/json').send({
      email: 'john_doe@mail.com',
      password: 'John_123'
    });

    expect(result.status).toBe(200);
    expect(result.header['content-type']).toMatch('application/json');
    expect(typeof result.body.token).toBe('string');
  });

  test('Wrong get access token, wrong password', async () => {
    // given
    const server = Server.instance;
    const result = await request(server.app).post('/auth/login').send({
      email: 'john_doe@mail.com',
      password: 'John_1234'
    });

    expect(result.status).toBe(400);
    expect(typeof result.body.message).toBe('string');
    expect(result.body.message).toBe('Email or password are incorrect.');
    expect(result.body.errors).toBe(null);
  });

  test('Wrong get access token, wrong email', async () => {
    // given
    const server = Server.instance;
    const result = await request(server.app).post('/auth/login').send({
      email: 'john_doemail.com',
      password: 'John_1234'
    });

    expect(result.status).toBe(400);
    expect(typeof result.body.message).toBe('string');
    expect(result.body.message).toBe('Validation errors in your request');
    // expect(typeof result.body.errors).toBe('object');
  });
});
