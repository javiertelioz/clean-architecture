import { Sequelize } from 'sequelize';

import sequelizeConfig from './config/index.js';

/**
 * Class SequelizeAdapter
 * @class
 * @constructor
 * @public
 */
class SequelizeAdapter {
  public sequelize: Sequelize;
  private readonly config: any;

  private static _intance: SequelizeAdapter;

  private constructor() {
    this.config = sequelizeConfig[process.env.NODE_ENV || 'development'];
    this.sequelize = new Sequelize(this.config.database, this.config.username, this.config.password, this.config);
  }

  public static get instance(): SequelizeAdapter {
    return this._intance || (this._intance = new this());
  }

  async run(callback?: () => void): Promise<void> {
    try {
      this.sequelize.authenticate();

      if (!callback) {
        console.info(
          '💽 SQL \n',
          `\tDatabase:\t ${this.config.database}\n`,
          `\tEngine:\t\t ${this.config.dialect}\n`,
          `\tStatus: \t 1\n`,
          `\tVerion Drive:\t ${await this.sequelize.databaseVersion()}\n`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default SequelizeAdapter;
