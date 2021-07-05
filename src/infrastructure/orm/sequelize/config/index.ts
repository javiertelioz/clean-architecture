/**
 * Sequelize Config
 * @see https://sequelize.org/v6/manual/dialects.html
 */
const sequelizeConfig: any = {
  development: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres'
  },
  test: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    logging: false
  },
  staging: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    logging: true
  },
  production: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    logging: false
  }
};

export default sequelizeConfig;
