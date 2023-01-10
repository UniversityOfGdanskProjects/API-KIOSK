import { connectToDB } from '../../src/Configs/db.config';
import { UsersModel } from '../../src/Models/users.model';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { app, server } from '../../src/index';

describe('Test of login route', () => {
    let hashedPassword: string;

    beforeAll(async () => {
        await connectToDB();

        hashedPassword = await bcrypt.hash('password', 10);

        await UsersModel.create({
            login: 'login_routes',
            password: hashedPassword,
        });
    });

    afterAll(async () => {
        await UsersModel.deleteOne({ login: 'login_routes' });
        await mongoose.disconnect();
        server.close();
    });

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
