import { Request, RequestHandler, Response } from 'express';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';
import { ErrorType } from '../Types/error.type';
import { LessonsModel } from '../Models/lessonPlanEntry.model';

export const getAllLessonsForMajorYear: RequestHandler = async (
    req: Request,
    res: Response<LessonsPlanEntry[] | Partial<ErrorType>>
) => {
    try {
        const { major, year } = req.params;

        const lessonsPlans = await LessonsModel.find(
            { name: major, year: year },
            { __v: 0 }
        );

        return res.status(200).json(lessonsPlans);
    } catch (error) {
        return res.status(500).json({
            message:
                'Something went wrong when retrieving lessons from database',
        });
    }
};

export const getAllLecturesForMajorYear: RequestHandler = async (
    req: Request,
    res: Response<LessonsPlanEntry[] | Partial<ErrorType>>
) => {
    try {
        const { major, year } = req.params;

        // TODO: change mapping of groups in webscrapper and change for searching "type":"wykład" instead of "groups":"all"
        const lessonsPlans = await LessonsModel.find(
            {
                name: major,
                year: year,
                groups: 'all',
            },
            { __v: 0 }
        );

        return res.status(200).json(lessonsPlans);
    } catch (error) {
        return res.status(500).json({
            message:
                'Something went wrong when retrieving lessons from database',
        });
    }
};

export const getAllLessonsForMajorYearGroup: RequestHandler = async (
    req: Request,
    res: Response<LessonsPlanEntry[] | Partial<ErrorType>>
) => {
    try {
        const { major, year, group } = req.params;

        const lessonsPlans = await LessonsModel.find(
            {
                name: major,
                year: year,
                groups: { $in: ['all', group, 'fakultet', 'seminarium'] },
            },
            { __v: 0 }
        );

        return res.status(200).json(lessonsPlans);
    } catch (error) {
        return res.status(500).json({
            message:
                'Something went wrong when retrieving lessons from database',
        });
    }
};
