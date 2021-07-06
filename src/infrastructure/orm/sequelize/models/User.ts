import { Model, DataTypes } from 'sequelize';

import SequelizeAdapter from '../index';

const { sequelize } = SequelizeAdapter.instance;

export class UserSequelize extends Model {}

export class UserSequelizeModel {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  gender?: string;
  phone?: string;
  picture?: string;
  dob?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

UserSequelize.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING(10)
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING(16)
    },
    picture: {
      allowNull: true,
      type: DataTypes.STRING()
    },
    dob: {
      allowNull: true,
      type: DataTypes.DATEONLY()
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60)
    }
  },
  {
    sequelize,
    paranoid: true,
    underscored: true,
    modelName: 'user',
    comment: 'User Table'
  }
);
