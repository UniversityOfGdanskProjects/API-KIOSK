import {
    Express,
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from 'express';
import { NewsModel } from '../../Models/news.model';

export const getNews: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await NewsModel.find()
        .then((allNews) => {
            return res.status(200).json({
                success: true,
                message: 'All news',
                News: allNews,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.message,
            });
        });
};

export const getNewsDetail: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    await NewsModel.findById(id)
        .then((singleNews) => {
            res.status(200).json({
                success: true,
                message: 'Single news',
                News: singleNews,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This news does not exist',
                error: err.message,
            });
        });
};
