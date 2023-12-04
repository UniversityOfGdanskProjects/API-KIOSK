import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectToDB = async (): Promise<void> => {
    dotenv.config();

    mongoose.set('strictQuery', false);

    const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}`;

    const dbName = process.env.DB_NAME;

    try {
        await mongoose.connect(`${mongoUri}/${dbName}?retryWrites=true`);
        console.log(`Connected with MongoDB ${dbName} database`);
    } catch (error) {
        console.log(error);
    }
};
