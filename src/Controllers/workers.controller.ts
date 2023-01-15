import { Request, Response, NextFunction, RequestHandler } from 'express';
import { workersScraper } from '../Services/workersScraper.service';
import { Worker } from '../Types/worker.type';

export const getAllWorkers: RequestHandler = async (
    req: Request,
    res: Response<Worker[] | string>,
    next: NextFunction
) => {
    const workers = await workersScraper();

    if ('status' in workers) {
        res.status(workers.status).send(workers.message);
        return;
    }

    res.send(workers);
};
