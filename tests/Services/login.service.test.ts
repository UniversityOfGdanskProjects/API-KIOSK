import { UsersModel } from '../../src/Models/users.model';
import { checkLoginData } from '../../src/Services/login.service';
import { connectToDB } from '../../src/Configs/db.config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

describe('Test of login service', () => {
    let hashedPassword: string;

    beforeAll(async () => {
        await connectToDB();

        hashedPassword = await bcrypt.hash('password', 10);

        await UsersModel.create({
            login: 'login_service',
            password: hashedPassword,
        });
    });

    afterAll(async () => {
        await UsersModel.deleteOne({ login: 'login_service' });
        await mongoose.disconnect();
    });

    it.only('Correct login data', async () => {
        const foundUser = await checkLoginData({
            login: 'login_service',
            password: 'password',
        });

        expect(foundUser?.login).toBe('login_service');
        expect(foundUser?.password).toBe(hashedPassword);
    });

    it.only('Non-existing user', async () => {
        const foundUser = await checkLoginData({
            login: 'anotherLogin_service',
            password: 'anotherPassword',
        });

        expect(foundUser).toBe(null);
    });

    it.only('Wrong password', async () => {
        const foundUser = await checkLoginData({
            login: 'login_service',
            password: 'anotherPassword',
        });

        expect(foundUser).toBe(null);
    });
});
