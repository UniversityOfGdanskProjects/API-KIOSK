import axios from 'axios';
import cheerio from 'cheerio';
import { Events, EventsContent } from '../Types/events.type';
import { ErrorType } from '../Types/error.type';

const eventsContent = async (url: string): Promise<EventsContent | null> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const wholeText = $('.node__content p');
        const lines = await Promise.all(
            wholeText.map(async (idx, line) => {
                const text = $(line).text();
                return text;
            })
        );
        const content = {
            text: lines,
        } as EventsContent;

        return content;
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
                    const name = $(element).text().replace(/\n/g, '');
                    const eventEndPoint = $(element)
                        .find('.node__title a')
                        .attr('href');
                    const link = 'https://mfi.ug.edu.pl' + eventEndPoint;

                    return {
                        name: name,
                        link: link,
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
