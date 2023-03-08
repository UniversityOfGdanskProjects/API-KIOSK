import { Request, RequestHandler, Response } from 'express';
import { NewsModel } from '../Models/news.model';
import { ErrorType } from '../Types/error.type';
import { News } from '../Types/News.type';

export const getAllNews: RequestHandler = async (
    req: Request,
    res: Response<News[] | Partial<ErrorType>>
) => {
    try {
        const news = await NewsModel.find({});

        return res.json(news);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};

export const getNewsDetail: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        const singleNews = await NewsModel.findById(id);

        if (!singleNews) {
            return res
                .status(404)
                .json({ message: 'This news does not exist' });
        }

        return res.json({ singleNews: singleNews });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
};
