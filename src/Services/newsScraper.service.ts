import axios from 'axios';
import cheerio from 'cheerio';
import { News, NewsSource } from '../Types/News.type';
import { reformatDate } from '../utils/newsScraper/fixDate';
import { removeSeeMore } from '../utils/newsScraper/removeSeeMore';
import { splitByLines } from '../utils/newsScraper/splitByLines';
import { mapNewsCategory } from '../utils/newsScraper/returnCategoryEnum';
import { ErrorType } from 'Types/error.type';
import { convertStringToDate } from '../utils/newsScraper/convertStringToDate';

const getBody = async (link: string, element: string): Promise<string> => {
    const HTMLDataRequest = await axios.get(link);
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const selectedElem = element;
    return $(selectedElem).text();
};

export const newsScraperMFI = async (): Promise<News[] | null> => {
    const mfiNewsSites = ['aktualnosci', 'aktualnosci/archiwum-aktualnosci'];
    const newsMFIPromises = (await Promise.allSettled(
        mfiNewsSites.map(async (site) => {
            return await getNewsInCategoriessMFI(site);
        })
    )) as { status: 'fulfilled' | 'rejected'; value: News[] }[];
    const resolvedNewsMFIPromises = newsMFIPromises.filter(
        ({ status }) => status === 'fulfilled'
    );
    const newsMFIResponses = resolvedNewsMFIPromises.map(
        (promise) => promise.value
    );
    //TODO: error handling rejected promises

    return newsMFIResponses.flat();
};

const getNewsInCategoriessMFI = async (
    site: string
): Promise<News[] | ErrorType> => {
    const HTMLDataRequest = await axios.get(
        `https://mfi.ug.edu.pl/wydzial/${site}`
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
                const href = $(parentElem).find('.news-title a').attr('href');
                const title = $(parentElem).find('.news-title a').text();
                const datetime = $(parentElem).find('.news-datetime').text();
                const body = $(parentElem).find('.news-body').text();
                const longBody = await getBody(
                    'https://mfi.ug.edu.pl/' + href,
                    '.node__content > div:nth-child(2) > div:nth-child(1)'
                );
                const shortDescription = removeSeeMore(body);

                const newsDetail: News = {
                    photo: 'https://mfi.ug.edu.pl' + img,
                    link: 'https://mfi.ug.edu.pl' + href,
                    datetime: convertStringToDate(datetime),
                    title: title,
                    shortBody: splitByLines(shortDescription),
                    body: splitByLines(longBody),
                    source: NewsSource.MFI,
                    category: mapNewsCategory($('h1.title').text()),
                };

                return newsDetail;
            })
            .get()
    );
    return newsArray;
};

export const newsScraperINF = async (): Promise<News[] | null> => {
    const infNewsSites = ['news', 'studinfo'];
    const newsINFPromises = (await Promise.allSettled(
        infNewsSites.map(async (site) => {
            return await getNewsInCategoriesINF(site);
        })
    )) as { status: 'fulfilled' | 'rejected'; value: News[] }[];

    const resolvedNewsINFPromises = newsINFPromises.filter(
        ({ status }) => status === 'fulfilled'
    );
    const newsINFResponses = resolvedNewsINFPromises.map(
        (promise) => promise.value
    );
    //TODO: error handling rejected promises

    return newsINFResponses.flat();
};

const getNewsInCategoriesINF = async (
    site: string
): Promise<News[] | ErrorType> => {
    const HTMLDataRequest = await axios.get(`https://inf.ug.edu.pl/${site}`, {
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
                const newsDetail: News = {
                    photo: 'https://inf.ug.edu.pl/' + img,
                    link: 'https://inf.ug.edu.pl/' + href,
                    datetime: convertStringToDate(reformatDate(datetime)),
                    title: title,
                    shortBody: splitByLines(body),
                    body: splitByLines(longBody),
                    source: NewsSource.INF,
                    category: mapNewsCategory($('div.artHeader').text()),
                };
                return newsDetail;
            })
            .get()
    );

    return newsArray;
};
