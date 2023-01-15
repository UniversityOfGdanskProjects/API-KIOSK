import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Major } from '../Types/major.type';
import { majorsInfoScraper } from '../Services/majorsScraper.service';

export const getAllMajors: RequestHandler = async (
    req: Request,
    res: Response<Major[] | string>,
    next: NextFunction
) => {
    const majors = await majorsInfoScraper();

    if ('status' in majors) {
        return res.status(majors.status).send(majors.message);
    }

    return res.send(majors);
};
