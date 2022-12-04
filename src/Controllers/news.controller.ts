import {
    Express,
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export const getNewsMFI: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const HTMLData = await axios
        .get('https://mfi.ug.edu.pl/wydzial/aktualnosci')
        .then((res) => res.data)
        .catch((err) => {
            res.send(err);
        });
    const newsArray: {}[] = [];
    const $ = cheerio.load(HTMLData);
    const selectedElem: string = '.item-list > ul > li';
    $(selectedElem).each((parentIndex, parentElem) => {
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
        newsArray.push(newsDetail);
    });
    res.send(newsArray);
};

export const getNewsINF: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const HTMLData = await axios
        .get('https://inf.ug.edu.pl/studinfo', {
            headers: {
                'Accept-Encoding': 'application/json',
            },
        })
        .then((res) => res.data)
        .catch((err) => {
            res.send(err);
        });
    const newsArray: {}[] = [];
    const $ = cheerio.load(HTMLData);
    const selectedElem: string = 'div.newsBox';
    $(selectedElem).each((parentIndex, parentElem) => {
        const img = $(parentElem).find('.newsThumb').find('img').attr('src');
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
        newsArray.push(newsDetail);
    });
    res.send(newsArray);
};
