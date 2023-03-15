import { Request, RequestHandler, Response } from 'express';
import { NewsModel } from '../Models/news.model';
import { ErrorType } from '../Types/error.type';
import { News } from '../Types/News.type';

export const getAllNews = async (
    req: Request,
    res: Response<News[] | Partial<ErrorType>>
) => {
    try {
        const news = await NewsModel.find({}, { __v: 0 });

        return res.json(news);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};

export const getNewsDetail = async (
    req: Request<{ id: string }, {}, {}, {}, {}>,
    res: Response<News | { message: string }>
) => {
    try {
        const { id } = req.params;

        const singleNews = await NewsModel.findOne({ _id: id }, { __v: 0 });

        if (!singleNews) {
            return res
                .status(404)
                .json({ message: 'This news does not exist' });
        }

        return res.json(singleNews);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};
