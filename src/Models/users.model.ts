import mongoose from 'mongoose';
import { Users } from '../Types/User';

const UsersSchema = new mongoose.Schema<Users>({
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

export const UsersModel = mongoose.model<Users>('Users', UsersSchema, 'users');
