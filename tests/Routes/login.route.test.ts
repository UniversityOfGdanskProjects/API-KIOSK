import { loginBeforeAll } from '../utils/login/login.beforeAll';
import { loginAfterAll } from '../utils/login/login.afterAll';
import { app } from '../../src/index';
import request from 'supertest';
import bcrypt from 'bcrypt';

describe('Test of login route', () => {
    let hashedPassword: string;

    beforeAll(async () => {
        hashedPassword = await bcrypt.hash('password', 10);
        await loginBeforeAll('route', hashedPassword);
    });

    afterAll(loginAfterAll('route'));

    it.only('Correct login data', async () => {
        const loginData = {
            login: 'login_routes',
            password: 'password',
        };

        const response = await request(app).post('/login').send(loginData);

        expect(response.status).toEqual(200);
        expect(response.body.userData.login).toEqual('login_routes');
        expect(response.body.userData.password).toEqual(hashedPassword);
        expect(response.body).toHaveProperty('jwt_token');
    });

    it.only('Wrong login data', async () => {
        const loginData = {
            login: 'anotherLogin',
            password: 'anotherPassword',
        };

        const response = await request(app).post('/login').send(loginData);

        expect(response.status).toEqual(401);
        expect(response.text).toEqual('Invalid login or password.');
    });
});
