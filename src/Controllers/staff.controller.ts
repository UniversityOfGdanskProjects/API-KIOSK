import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StaffModel } from '../Models/staff.model';
import { Academic } from 'Types/staff.type';

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
        const criteria = name ? { name: { $regex: name, $options: 'i' } } : {};
        const pageNumber = page ? parseInt(page, 10) : 1;

        const staff = await StaffModel.find(criteria, {
            __v: 0,
            'content.posts._id': 0,
        })
            .skip((pageNumber - 1) * 30)
            .limit(30);

        const totalStaffRecords = await StaffModel.countDocuments(criteria);
        const totalPages = Math.ceil(totalStaffRecords / 30);

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
