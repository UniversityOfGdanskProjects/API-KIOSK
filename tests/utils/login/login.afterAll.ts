import { UsersModel } from '../../../src/Models/users.model';
import { server } from '../../../src/index';
import mongoose from 'mongoose';

export const loginAfterAll = (source: string) => async () => {
    await UsersModel.deleteOne({ login: `login_${source}` });
    await mongoose.disconnect();
    if (source === 'route') server.close();
};
