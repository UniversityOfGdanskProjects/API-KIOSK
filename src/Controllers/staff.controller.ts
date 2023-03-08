import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StaffModel } from '../Models/staff.model';
import { Academic } from 'Types/staff.type';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

interface Pagination<T> {
    content: T[];
    page: number;
    totalPages: number;
}

export const getStaff = async (
    req: Request<{}, {}, {}, { page: string; name: string }>,
    res: Response<Pagination<Academic> | { message: string }>,
    next: NextFunction
) => {
    try {
        const { page, name } = req.query;
        const pageNumber = page ? parseInt(page, 10) : 1;
        const staff = await StaffModel.find(
            { name: { $regex: name, $options: 'i' } },
            { __v: 0, 'content.posts._id': 0 }
        )
            .skip((pageNumber - 1) * 30)
            .limit(30);

        const totalRecords = await StaffModel.countDocuments();
        const totalPages = Math.ceil(totalRecords / 30);
        return res
            .status(200)
            .json({ content: staff, page: pageNumber, totalPages });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};

export const getStaffById: RequestHandler = async (
    req: Request,
    res: Response<Academic | null | { message: string }>,
    next: NextFunction
) => {
    try {
        const person = await StaffModel.findById(req.params.id, {
            __v: 0,
            'content.posts._id': 0,
        });

        return res.status(200).json(person);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};

export const searchStaffByName: RequestHandler = async (
    req: Request<any, any, { name: string }>,
    res: Response<Academic[] | { message: string }>,
    next: NextFunction
) => {
    try {
        const { name } = req.query;
        const criteria = name ? { name: { $regex: name, $options: 'i' } } : {};

        const staff = await StaffModel.find(criteria, {
            __v: 0,
            'content.posts._id': 0,
        });

        return res.status(200).json(staff);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};

export const searchStaffByUnit: RequestHandler = async (
    req: Request,
    res: Response<Academic[] | { message: string }>,
    next: NextFunction
) => {
    try {
        const { unit } = req.query;
        const staff = await StaffModel.aggregate([
            {
                $project: {
                    name: 1,
                    units: 1,
                },
            },
            {
                $match: {
                    units: { $regex: unit, $options: 'i' },
                },
            },
        ]);

        return res.status(200).json(staff);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};

export const getUnitsInfo: RequestHandler = async (
    req: Request,
    res: Response<{ string: number }[] | { message: string }>,
    next: NextFunction
) => {
    try {
        const units = await StaffModel.aggregate([
            {
                $unwind: '$units',
            },
            {
                $group: {
                    _id: '$units',
                    count: { $sum: 1 },
                },
            },
        ]);

        return res.status(200).json(units);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};

export const getStaffCsv: RequestHandler = async (
    req: Request,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    try {
        const staff = await StaffModel.aggregate([
            {
                $match: {
                    units: { $nin: ['Dziekanat'] },
                    'content.tutorial': { $in: [null, ''] },
                },
            },
            {
                $project: { _id: 0, name: 1, link: 1, email: '$content.email' },
            },
        ]);
        const filePath = path.join(__dirname, '../files/staff.csv');
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: [
                { id: 'name', title: 'imię i nazwisko' },
                { id: 'link', title: 'link' },
                { id: 'email', title: 'adres e-mail' },
            ],
            fieldDelimiter: ';',
        });

        await csvWriter.writeRecords(staff);

        res.setHeader('Content-Type', 'text/csv');
        res.download(filePath, 'staff.csv');
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};
