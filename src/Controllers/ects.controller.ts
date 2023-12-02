import { Request, RequestHandler, Response } from 'express';
import { EctsModel } from '../Models/ectsSubject.model';

export const getAllMajors: RequestHandler = async (req: Request, res: any) => {
    try {
        const majors = await EctsModel.find().distinct('major');

        return res.status(200).json(majors);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong when retrieving majors',
        });
    }
};
