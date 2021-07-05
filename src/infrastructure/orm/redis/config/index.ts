import { ClientOpts } from 'redis';

/**
 * Redis Config
 *
 * @see https://github.com/NodeRedis/node-redis#options-object-properties
 */
const redisConfig: ClientOpts = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379
};

export default redisConfig;
