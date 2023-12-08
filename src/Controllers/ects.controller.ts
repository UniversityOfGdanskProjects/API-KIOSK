import { Request, RequestHandler, Response } from 'express';
import { EctsModel } from '../Models/ectsSubject.model';
import { ErrorType } from 'Types/error.type';

export const getAllMajors: RequestHandler = async (
    req: Request,
    res: Response<string[] | Partial<ErrorType>>
) => {
    try {
        const majors = await EctsModel.find().distinct('major');

        return res.status(200).json(majors);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong when retrieving majors',
        });
    }
};
