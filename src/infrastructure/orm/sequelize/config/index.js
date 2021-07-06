/**
 * Sequelize Config
 * @see https://sequelize.org/v5/manual/dialects.html
 */
 module.exports = {
  development: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    // "operatorsAliases": false,
  },
  test: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    logging: false, // remove logs
    // "operatorsAliases": false
  },
  staging: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    // "operatorsAliases": false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  production: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASS,
    database: process.env.POSTGRESQL_DATABASE,
    host: process.env.POSTGRESQL_HOST,
    dialect: process.env.DB_ENGINE || 'postgres',
    logging: false, // remove logs
    // "operatorsAliases": false,
    // "ssl": true,
    // "dialectOptions": {
    //  "ssl": {
    //    "require": true
    //  }
    // }
  },
};
