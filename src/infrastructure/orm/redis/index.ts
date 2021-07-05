import redis, { RedisClient, RedisError } from 'redis';

import redisConfig from './config';

import Logger from '../../Logger';

/**
 * Class RedisAdapter
 */
class RedisAdapter {
  public redisClient: RedisClient;

  private static _intance: RedisAdapter;

  private constructor() {}

  public static get instance(): RedisAdapter {
    return this._intance || (this._intance = new this());
  }

  private handleError(err: RedisError) {
    Logger.error('Redis client error', err.stack);
  }

  private handleSuccess() {
    console.info(
      '🗄️  Redis\n',
      `\tHost: \t\t ${redisConfig.host}\n`,
      `\tPort: \t\t ${redisConfig.port}\n`,
      '\tStatus: \t 1\n'
    );
  }

  run(): void {
    this.redisClient = redis.createClient(redisConfig);

    this.redisClient.on('error', this.handleError);
    this.redisClient.on('connect', this.handleSuccess);
  }
}

export default RedisAdapter;
