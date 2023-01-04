import { UsersModel } from '../../src/Models/users.model';
import { checkLoginData } from '../../src/Services/login.service';
import { connectToDB } from '../../src/Configs/db.config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

describe('Test of login service', () => {
    beforeAll(async () => await connectToDB());

    afterAll(async () => await mongoose.disconnect());

    it.only('Find existing user', async () => {
        const createdUser = await UsersModel.create({
            login: 'login',
            password: await bcrypt.hash('password', 10),
        });

        const foundUser = await checkLoginData({
            login: 'login',
            password: 'password',
        });

        expect(foundUser?.login).toBe(createdUser.login);
        expect(foundUser?.password).toBe(createdUser.password);

        await UsersModel.findByIdAndDelete(createdUser._id);
    });
});
