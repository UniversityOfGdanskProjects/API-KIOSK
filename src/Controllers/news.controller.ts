import {
    Express,
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from 'express';
import axios, { AxiosError } from 'axios';
import cheerio from 'cheerio';
import { News } from '@/Types/News';

export const getNewsMFI: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const HTMLDataRequest = await axios.get(
            'https://mfi.ug.edu.pl/wydzial/aktualnosci'
        );
        const HTMLData = HTMLDataRequest.data;

        const $ = cheerio.load(HTMLData);
        const selectedElem = '.item-list > ul > li';
        const newsArray: News[] = $(selectedElem)
            .map((parentIndex, parentElem) => {
                const img = $(parentElem)
                    .find('.image-style-news-main-page')
                    .attr('src');
                const href = $(parentElem).find('.news-title a').attr('href');
                const title = $(parentElem).find('.news-title a').text();
                const datetime = $(parentElem).find('.news-datetime').text();
                const body = $(parentElem).find('.news-body').text();
                const newsDetail = {
                    photo: 'https://mfi.ug.edu.pl' + img,
                    link: 'https://mfi.ug.edu.pl' + href,
                    datetime: datetime,
                    title: title,
                    body: body,
                };

                return newsDetail;
            })
            .get();

        res.send(newsArray);
    } catch (err) {
        const error = err as Error | AxiosError;
        res.status(500).json({
            success: false,
            message: 'Could not get data!',
            error: error.message,
        });
    }
};

export const getNewsINF: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const HTMLDataRequest = await axios.get(
            'https://inf.ug.edu.pl/studinfo',
            {
                headers: {
                    'Accept-Encoding': 'application/json',
                },
            }
        );
        const HTMLData = HTMLDataRequest.data;
        const $ = cheerio.load(HTMLData);
        const selectedElem = 'div.newsBox';
        const newsArray: News[] = $(selectedElem)
            .map((parentIndex, parentElem) => {
                const img = $(parentElem)
                    .find('.newsThumb')
                    .find('img')
                    .attr('src');
                const href = $(parentElem).find('a').first().attr('href');
                const title = $(parentElem).find('.newsTitle a').text();
                const datetime = $(parentElem).find('.newsDate').text();
                const body = $(parentElem).find('.newsBody').text();
                const newsDetail = {
                    photo: 'https://inf.ug.edu.pl/' + img,
                    link: 'https://inf.ug.edu.pl/' + href,
                    datetime: datetime,
                    title: title,
                    body: body,
                };
                return newsDetail;
            })
            .get();

        res.send(newsArray);
    } catch (err) {
        const error = err as Error | AxiosError;
        res.status(500).json({
            success: false,
            message: 'Could not get data!',
            error: error.message,
        });
    }
};
