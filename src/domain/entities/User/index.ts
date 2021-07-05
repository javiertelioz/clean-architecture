import { EntityBase } from '../../EntityBase';

/**
 * User interface Entity
 */
export interface IUser {
  id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
  gender?: string;
}

/**
 * User interface Entity
 */

export class User extends EntityBase implements IUser {
  id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  gender?: string;

  constructor(
    id = null,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    gender: string
  ) {
    super();

    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.gender = gender || null;
  }
}
