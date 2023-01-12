import { Request, Response, NextFunction, RequestHandler } from 'express';
import { workersScraper } from '../Services/workersScraper.service';

export const getAllWorkers: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const workers = await workersScraper();
    if ('status' in workers) {
        res.status(workers.status).send(workers.message);
        return;
    }
    res.send(workers);
};
