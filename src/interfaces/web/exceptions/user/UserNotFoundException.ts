import HttpException from '../HttpException';

class UserNotFoundException extends HttpException {
  constructor() {
    super(404, 'User not found');
  }
}

export default UserNotFoundException;
