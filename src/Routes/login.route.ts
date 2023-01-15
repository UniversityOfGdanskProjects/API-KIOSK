import { loginController } from '../Controllers/login.controller';
import { Router } from 'express';

const loginRouter = Router();

loginRouter.post('/login', loginController);

export default loginRouter;
