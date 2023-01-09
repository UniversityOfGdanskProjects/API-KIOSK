import { User } from '../Types/User';
import { UsersModel } from '../Models/users.model';
import bcrypt from 'bcrypt';

export const checkLoginData = async (loginData: User): Promise<User | null> => {
    const user = await UsersModel.findOne({ login: loginData.login });
    if (user === null) return null;

    const ifPasswordCorrect = await bcrypt.compare(
        loginData.password,
        user.password
    );

    return ifPasswordCorrect ? user : null;
};
