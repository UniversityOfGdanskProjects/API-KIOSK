import axios from 'axios';
import cheerio from 'cheerio';
import { Events } from '../Types/events.type';
import { ErrorType } from '../Types/error.type';
import { text } from 'body-parser';

const eventsContent = async (url: string): Promise<Array<string> | null> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const description = $('.node__content > div > div');
        const lines = await Promise.all(
            description.children().map(async (idx, line) => {
                const text = $(line).text().replace(/\n/g, ' ').replace(/\t/g, '').trim();
                return text
            })
        );
        const linesWithoutBlanks = (lines.filter(text => text.length > 0 && text !== "wydarzenia"))

        const result = await Promise.all(
            linesWithoutBlanks.map(async (text) => {
                return text + " " + "\r\n"
            })
        );

        // const helper = linesWithoutBlanks.filter((text) => text !== "wydarzenia")

        return result;
    } catch (error) {
        return null;
    }
};

export const eventsScraper = async (): Promise<Events[] | ErrorType> => {
    try {
        const { data } = await axios.get('https://mfi.ug.edu.pl/wydarzenia');
        const $ = cheerio.load(data);

        const selectedElement = $('.node__title');
        const events = await Promise.all(
            selectedElement
                .map(async (i, element) => {
                    const name = $(element).text().replace(/\n/g, '').trim();
                    const eventEndPoint = $(element)
                        .find('.node__title a')
                        .attr('href');
                    const link = 'https://mfi.ug.edu.pl' + eventEndPoint;

                    return {
                        name: name,
                        url: link,
                        content: await eventsContent(link),
                    } as Events;
                })
                .get()
        );
        return events;
    } catch (error) {
        // @ts-ignore
        if (error?.response?.status === 404) {
            return {
                // @ts-ignore
                status: error.response.status,
                message: 'Sorry! Could not find event',
            };
        }
        // @ts-ignore
        if (error?.response?.status) {
            return {
                // @ts-ignore
                status: error.response.status,
                message: 'Something went wrong',
            };
        }
        return { status: 500, message: 'Something went wrong' };
    }
};
