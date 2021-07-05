import redisConnect from 'connect-redis';
import expressSession from 'express-session';

import RedisAdapter from '../../../infrastructure/orm/redis';

const { redisClient } = RedisAdapter.instance;

const Store = redisConnect(expressSession);

export const session = expressSession({
  resave: false,
  saveUninitialized: false,
  store: new Store({ client: redisClient }),
  secret: process.env.SESSION_SECRET_KEY || ''
});
