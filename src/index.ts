import dotenv from 'dotenv';

import Server from './interfaces/web/Server';

import Logger from './infrastructure/Logger';
import RedisAdapter from './infrastructure/orm/redis';
import MongooseAdapter from './infrastructure/orm/mongoose';
import SequelizeAdapter from './infrastructure/orm/sequelize';

dotenv.config();

const server = Server.instance;

// const redis = RedisAdapter.instance;
const mongoose = MongooseAdapter.instance;
// const sequelize = SequelizeAdapter.instance;

/**
 * Start Server
 *
 * @function
 */
const bootstrap = async () => {
  Logger.log(`Run Environment: ${process.env.NODE_ENV}`);
  Logger.log(`Launch Application: ${process.env.APP_NAME}\n`);

  try {
    // redis.run();
    // await sequelize.run();
    await mongoose.run();

    server.start();
  } catch (error) {
    Logger.error(error.message, error.stack);
    process.exit(1);
  }
};

bootstrap();
