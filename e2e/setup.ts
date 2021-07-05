import dotenv from 'dotenv';

import Server from '../src/interfaces/web/Server';

import Logger from '../src/infrastructure/Logger';
// import RedisAdapter from '../src/infrastructure/orm/redis';
import MongooseAdapter from '../src/infrastructure/orm/mongoose';
// import SequelizeAdapter from '../src/infrastructure/orm/sequelize';

dotenv.config({ path: '.env' });

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
  Logger.log(`Run Environment: ${process.env.NODE_ENV}:testing`);
  Logger.log(`Launch Application: ${process.env.APP_NAME}:testing\n`);

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

export default bootstrap;
