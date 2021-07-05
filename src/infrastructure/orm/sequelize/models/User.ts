import { Model, STRING, DATEONLY, INTEGER } from 'sequelize';

import SequelizeAdapter from '../index';

const { sequelize } = SequelizeAdapter.instance;

export class User extends Model {}

export class UserModel {
  id: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: INTEGER
    },
    firstname: {
      allowNull: false,
      type: STRING(80)
    },
    lastname: {
      allowNull: false,
      type: STRING(80)
    },
    gender: {
      allowNull: true,
      type: STRING(10)
    },
    phone: {
      allowNull: true,
      type: STRING(16)
    },
    picture: {
      allowNull: true,
      type: STRING()
    },
    dob: {
      allowNull: true,
      type: DATEONLY()
    },
    email: {
      allowNull: false,
      type: STRING(50)
    },
    password: {
      allowNull: false,
      type: STRING(60)
    }
  },
  {
    modelName: 'User',
    sequelize
  }
);
