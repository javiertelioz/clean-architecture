import bcrypt from 'bcrypt';

import { ICryptManager } from '../../application/security/ICryptManager';

export default class BcryptManager implements ICryptManager {
  hash(data: string): string {
    return bcrypt.hashSync(data, process.env.SALTORROUNDS || 10);
  }

  compare(plain: string, hashed: string): boolean {
    return bcrypt.compareSync(plain, hashed);
  }
}
