import { stopScheduledJobs } from '../utils/stopScheduledJobs';
import { connectToDB } from '../../src/Configs/db.config';
import { UsersModel } from '../../src/Models/users.model';
import { server } from '../../src/index';
import { app } from '../../src/app';
import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';

describe('Test of login route', () => {
    let hashedPassword: string;

    beforeAll(async () => {
        hashedPassword = await bcrypt.hash('password', 10);

        await connectToDB();
        await UsersModel.create({
            login: 'login_route',
            password: hashedPassword,
        });
    });

    afterAll(async () => {
        await UsersModel.deleteOne({ login: 'login_route' });
        await mongoose.disconnect();

        stopScheduledJobs();
        server.close();
    });

    it.only('Correct login data', async () => {
        const loginData = {
            login: 'login_route',
            password: 'password',
        };

        const response = await request(app).post('/login').send(loginData);

        expect(response.status).toEqual(200);
        expect(response.body.userData.login).toEqual('login_route');
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
