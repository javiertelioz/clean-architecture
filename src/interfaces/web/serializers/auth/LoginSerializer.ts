import { IBaseSerializer } from '../IBaseSerializer';

/**
 * Login Serializer
 */
export default class LoginSerializer implements IBaseSerializer {
  private static instance: LoginSerializer;

  private constructor() {}

  public static getInstance(): LoginSerializer {
    if (!LoginSerializer.instance) {
      LoginSerializer.instance = new LoginSerializer();
    }

    return LoginSerializer.instance;
  }

  serialize(data: any) {
    if (!data) {
      throw new Error('Data cannot be undefined or null');
    }

    if (Array.isArray(data)) {
      return data.map(this.singleSerialize);
    }

    return this.singleSerialize(data);
  }

  singleSerialize(entity: any): any {
    return { token: entity.token };
  }
}
