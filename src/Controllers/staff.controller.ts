import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StaffModel } from '../Models/staff.model';
import { Academic } from 'Types/staff.type';
import { ErrorType } from '../Types/error.type';

export const getAllStaff: RequestHandler = async (
    req: Request,
    res: Response<Academic[] | ErrorType>,
    next: NextFunction
) => {
    try {
        const staff = await StaffModel.find({}, { _id: 0, __v: 0 });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `There's an ${error}. Please try again.`,
        });
    }
};
