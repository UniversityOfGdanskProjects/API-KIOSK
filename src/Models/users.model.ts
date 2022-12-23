import mongoose from 'mongoose';
import { User } from '../Types/User';

const UsersSchema = new mongoose.Schema<User>({
    login: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const UsersModel = mongoose.model<User>('Users', UsersSchema, 'users');
