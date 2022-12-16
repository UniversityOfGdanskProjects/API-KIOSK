import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}`;

mongoose.set('strictQuery', false);
mongoose
    .connect(connectionString)
    .then(() => console.log('Connected with MongoDB'));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
