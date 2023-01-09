import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectToDB = async (): Promise<void> => {
    dotenv.config();

    mongoose.set('strictQuery', false);

    const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}`;

    const dbName =
        process.env.NODE_ENV === 'production' ? 'KioskDB_PROD' : 'KioskDB';

    try {
        await mongoose.connect(`${mongoUri}/${dbName}?retryWrites=true`);
        console.log(`Connected with MongoDB ${dbName} database`);
    } catch (error) {
        console.log(error);
    }
};
