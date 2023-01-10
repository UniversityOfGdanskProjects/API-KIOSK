import { loginController } from '../../src/Controllers/login.controller';
import { TypedRequestBody } from '../../src/Types/TypedRequestBody';
import { loginBeforeAll } from '../utils/login/login.beforeAll';
import { loginAfterAll } from '../utils/login/login.afterAll';
import { mockResponse } from '../utils/mockResponse';
import { User } from '../../src/Types/User';
import { Response } from 'express';
import bcrypt from 'bcrypt';

describe('Test of login controller', () => {
    let hashedPassword: string;

    beforeAll(async () => {
        hashedPassword = await bcrypt.hash('password', 10);
        await loginBeforeAll('controller', hashedPassword);
    });

    afterAll(loginAfterAll('controller'));

    it.only('Correct login data', async () => {
        const request = {
            body: { login: 'login_controller', password: 'password' },
        };
        const response = mockResponse();

        const result = await loginController(
            request as TypedRequestBody<User>,
            response as Response
        );

        expect(result.json).toBeCalledWith({
            userData: expect.any(Object),
            jwt_token: expect.any(String),
        });
    });

    it.only('Incorrect user data', async () => {
        const request = {
            body: { login: 'login_controller', password: 'anotherPassword' },
        };
        const response = mockResponse();

        const result = await loginController(
            request as TypedRequestBody<User>,
            response as Response
        );

        expect(result.status).toBeCalledWith(401);
        expect(result.send).toBeCalledWith('Invalid login or password.');
    });
});
