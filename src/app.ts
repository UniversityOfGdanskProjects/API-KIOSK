import lessonsPlansRouter from './Routes/lessonsPlans.route';
import majorsRouter from './Routes/majors.route';
import loginRouter from './Routes/login.route';
import staffRouter from './Routes/staff.route';
import newsRouter from './Routes/news.route';
import express, { Request, Response } from 'express';
import cors from 'cors';
import ectsSubjectRouter from './Routes/ectsSubject.route';
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kiosk API',
            version: '1.0.0',
            description: 'API for Kiosk',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['src/Routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());

app.use(majorsRouter);
app.use(loginRouter);
app.use(lessonsPlansRouter);
app.use(staffRouter);
app.use(newsRouter);
app.use(ectsSubjectRouter);

app.get('/', (req: Request, res: Response) =>
    res.status(200).send('API-KIOSK')
);

export { app };
