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

const getBody = async (link: string, element: string): Promise<string> => {
    const HTMLDataRequest = await axios.get(link);
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const selectedElem = element;
    return $(selectedElem).text();
};

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
        const newsArray: News[] = await Promise.all(
            $(selectedElem)
                .map(async (parentIndex, parentElem) => {
                    const img = $(parentElem)
                        .find('.image-style-news-main-page')
                        .attr('src');
                    const href = $(parentElem)
                        .find('.news-title a')
                        .attr('href');
                    const title = $(parentElem).find('.news-title a').text();
                    const datetime = $(parentElem)
                        .find('.news-datetime')
                        .text();
                    const body = $(parentElem).find('.news-body').text();
                    const longBody = await getBody(
                        'https://mfi.ug.edu.pl/' + href,
                        '.node__content > div:nth-child(2) > div:nth-child(1)'
                    );
                    const newsDetail = {
                        photo: 'https://mfi.ug.edu.pl' + img,
                        link: 'https://mfi.ug.edu.pl' + href,
                        datetime: datetime,
                        title: title,
                        shortBody: body,
                        body: longBody,
                        site: 'MFI',
                    };

                    return newsDetail;
                })
                .get()
        );

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
        const HTMLDataRequest = await axios.get('https://inf.ug.edu.pl/news', {
            headers: {
                'Accept-Encoding': 'application/json',
            },
        });
        const HTMLData = HTMLDataRequest.data;
        const $ = cheerio.load(HTMLData);
        const selectedElem = 'div.newsBox';
        const newsArray: News[] = await Promise.all(
            $(selectedElem)
                .map(async (parentIndex, parentElem) => {
                    const img = $(parentElem)
                        .find('.newsThumb')
                        .find('img')
                        .attr('src');
                    const href = $(parentElem).find('a').first().attr('href');
                    const title = $(parentElem).find('.newsTitle a').text();
                    const datetime = $(parentElem).find('.newsDate').text();
                    const body = $(parentElem).find('.newsBody').text();
                    const longBody = await getBody(
                        'https://inf.ug.edu.pl/' + href,
                        '.artBody'
                    );
                    const newsDetail = {
                        photo: 'https://inf.ug.edu.pl/' + img,
                        link: 'https://inf.ug.edu.pl/' + href,
                        datetime: datetime,
                        title: title,
                        shortBody: body,
                        body: longBody,
                        site: 'INF',
                    };
                    return newsDetail;
                })
                .get()
        );

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
