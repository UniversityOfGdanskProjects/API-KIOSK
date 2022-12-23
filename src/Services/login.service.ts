import { Users } from '../Types/Users';
import { UsersModel } from '../Models/users.model';
import bcrypt from 'bcrypt';

export const checkLoginData = async (loginData: Users) => {
    const user = await UsersModel.findOne({ login: loginData.login });
    return user !== null &&
        (await bcrypt.compare(user.password, loginData.password))
        ? user
        : null;
};
