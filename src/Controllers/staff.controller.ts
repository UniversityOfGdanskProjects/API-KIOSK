import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StaffModel } from '../Models/staff.model';
import { Academic } from 'Types/staff.type';

export const getAllStaff: RequestHandler = async (
    req: Request,
    res: Response<Academic[] | { message: string }>,
    next: NextFunction
) => {
    try {
        const staff = await StaffModel.find(
            {},
            { __v: 0, 'content.posts._id': 0 }
        );

        return res.status(200).json(staff);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `There's an ${error}. Please try again.` });
    }
};
