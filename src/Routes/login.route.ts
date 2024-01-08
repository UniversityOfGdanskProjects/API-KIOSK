import { loginController } from '../Controllers/login.controller';
import { Router } from 'express';

const loginRouter = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate a token.
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             username: admin
 *             password: secret_password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
loginRouter.post('/login', loginController);

export default loginRouter;
