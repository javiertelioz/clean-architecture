import { ConnectionOptions } from 'mongoose';

/**
 * Mongoose Config
 *
 * @see https://mongoosejs.com/docs/connections.html#options
 */
const MongooseConfig: ConnectionOptions = {
  poolSize: 10,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

export default MongooseConfig;
