import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Major } from '../Types/major.type';
import { MajorModel } from '../Models/majors.model';

export const getAllMajors: RequestHandler = async (
    req: Request,
    res: Response<Major[] | { message: string }>,
    next: NextFunction
) => {
    try {
        const majors = await MajorModel.find({});

        return res.json(majors);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};

export const getMajor: RequestHandler = async (
    req: Request,
    res: Response<{ major: Major } | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const major = await MajorModel.findOne({ _id: id });

        if (!major) {
            return res.status(404).json({ message: 'Could not find major' });
        }

        return res.json({ major: major });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};
