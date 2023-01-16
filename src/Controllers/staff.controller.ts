import { Request, Response, NextFunction, RequestHandler } from 'express';
import { staffScraper } from '../Services/staffScraper.service';
import { Academic } from '../Types/staff.type';

export const getAllStaff: RequestHandler = async (
    req: Request,
    res: Response<Academic[] | string>,
    next: NextFunction
) => {
    const staff = await staffScraper();

    if ('status' in staff) {
        res.status(staff.status).send(staff.message);
        return;
    }

    res.send(staff);
};
