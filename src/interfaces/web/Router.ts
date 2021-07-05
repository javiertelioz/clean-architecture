import IndexRouter from './routes';

import UserRouter from './routes/user';
import AuthRouter from './routes/auth';
import HelloRouter from './routes/hello';

const Router = () => [new IndexRouter(), new HelloRouter(), new UserRouter(), new AuthRouter()];

export default Router;
