import { connectToDB } from '../../../src/Configs/db.config';
import { UsersModel } from '../../../src/Models/users.model';

export const loginBeforeAll = async (
    source: string,
    hashedPassword: string
) => {
    await connectToDB();
    await UsersModel.create({
        login: `login_${source}`,
        password: hashedPassword,
    });
};
