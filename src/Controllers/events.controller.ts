import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Events } from '../Types/events.type';
import { eventsScraper } from '../Services/eventsScraper.service';

export const getAllEvents: RequestHandler = async (
    req: Request,
    res: Response<Events[] | string>,
    next: NextFunction
) => {
    const events = await eventsScraper();

    if ('status' in events) {
        return res.status(events.status).send(events.message);
    }

    return res.send(events);
};
