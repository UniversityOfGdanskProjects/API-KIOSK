import { Request, Response } from 'express';
import { MajorOutput } from '../Types/major.type';
import {
    getAllMajorsService,
    getMajorDetailsService,
} from '../Services/majors.service';
import { Degree } from '../Types/degree.type';
import { Language } from '../Types/language.type';

export const getAllMajors = async (
    req: Request<{}, {}, {}, { language: Language; degree?: Degree }>,
    res: Response<MajorOutput[] | { message: string }>
) => {
    try {
        const { language, degree } = req.query;

        const majors = await getAllMajorsService({
            language,
            degree,
        });

        return res.json(majors);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};

export const getMajor = async (
    req: Request<{ id: string }, {}, {}, { language: Language }>,
    res: Response<MajorOutput | { message: string }>
) => {
    try {
        const { id } = req.params;
        const { language } = req.query;

        const major = await getMajorDetailsService(id, language);

        if (!major) {
            return res.status(404).json({ message: 'Could not find major' });
        }

        return res.json(major);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};
