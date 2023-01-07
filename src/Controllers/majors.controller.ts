import { Request, Response, NextFunction, RequestHandler } from 'express';
import { majorsInfoScraper } from '../Services/majorsScraper.service';

export const getAllMajors: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const majors = await majorsInfoScraper();

    res.send(JSON.stringify(majors));
};
