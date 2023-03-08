import { NewsPost } from './../Types/News.type';
import axios from 'axios';
import cheerio from 'cheerio';
import { News, NewsContent } from '../Types/News.type';

const getBody = async (link: string, element: string): Promise<string> => {
    const HTMLDataRequest = await axios.get(link);
    const HTMLData = HTMLDataRequest.data;

    const $ = cheerio.load(HTMLData);
    const selectedElem = element;
    return $(selectedElem).text();
};

export const newsScraperMFI = async (): Promise<News[] | null> => {
    try {
        const HTMLDataRequest = await axios.get(
            'https://mfi.ug.edu.pl/wydzial/aktualnosci'
        );
        const HTMLData = HTMLDataRequest.data;

        const $ = cheerio.load(HTMLData);
        const selectedElem = '.item-list > ul > li';
        const newsArray: NewsPost[] = await Promise.all(
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
                    };

                    return newsDetail;
                })
                .get()
        );
        const newsMFIArray: News[] = [
            {
                site: 'MFI',
                content: [
                    {
                        subSection: 'Aktualne',
                        posts: newsArray,
                    },
                ],
            },
        ];
        return newsMFIArray;
    } catch (err) {
        return null;
    }
};

const getNewsInSectionsINF = async (site: string) => {
    const HTMLDataRequest = await axios.get(`https://inf.ug.edu.pl/${site}`, {
        headers: {
            'Accept-Encoding': 'application/json',
        },
    });
    const HTMLData = HTMLDataRequest.data;
    const $ = cheerio.load(HTMLData);
    const selectedElem = 'div.newsBox';
    const newsArray: NewsPost[] = await Promise.all(
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
                };
                return newsDetail;
            })
            .get()
    );

    const newsINFArray: NewsContent = {
        subSection: $('div.artHeader').text(),
        posts: newsArray,
    };
    return newsINFArray;
};

export const newsScraperINF = async (): Promise<News[] | null> => {
    try {
        const infNewsSites = ['news', 'studinfo', 'zaoczne-plan'];
        const newsSections: NewsContent[] = await Promise.all(
            infNewsSites.map(async (site) => {
                return await getNewsInSectionsINF(site);
            })
        );
        const newsINFArray: News[] = [
            {
                site: 'INF',
                content: newsSections,
            },
        ];
        return newsINFArray;
    } catch (err) {
        return null;
    }
};
