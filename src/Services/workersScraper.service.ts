import axios from 'axios';
import cheerio from 'cheerio';
import { WorkerContent, Worker } from '../Types/worker.type';
import { ErrorType } from '../Types/error.type';

const workerScraper = async (url: string): Promise<WorkerContent | null> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const contact = $('.node-pracownik .group-pracownik-kontakt');
        const email = contact.find('.group-pracownik-kontakt .e-mail').text();

        const postElements = $('.group-jednostka-stanowisko .term li a');
        const posts = await Promise.all(
            postElements.map(async (idx, post) => {
                const name = $(post).text();
                return name;
            })
        );
        const tutorship = {
            schedule: $('#terminy_konsultacji p')
                .get()
                .reduce((acc, p) => (acc += $(p).text() + '\n'), ''),
            link: $('#terminy_konsultacji a').attr('href') || '',
        };
        const worker = {
            email: email,
            posts: posts,
            tutorship: tutorship,
        } as WorkerContent;
        return worker;
    } catch (error) {
        return null;
    }
};

export const workersScraper = async (): Promise<Worker[] | ErrorType> => {
    try {
        const { data } = await axios.get(
            'https://old.mfi.ug.edu.pl/pracownicy_mfi/sklad_osobowy'
        );
        const $ = cheerio.load(data);

        const selectedElement = $(
            '.wyszukiwarka-pracownikow-wyniki .view-content .views-row'
        );
        const workers = await Promise.all(
            selectedElement
                .map(async (index, element) => {
                    const workerName = $(element)
                        .find('.tytul .field-content a')
                        .text()
                        .replace(/\n/g, '');
                    const workerEndpoint = $(element)
                        .find('.tytul .field-content a')
                        .attr('href');
                    const workerLink =
                        'https://old.mfi.ug.edu.pl' + workerEndpoint;

                    const unitElements = $(element).find(
                        '.jednostki .term-tree-list a'
                    );
                    const units = await Promise.all(
                        unitElements.map((index, elem) => {
                            const name = $(elem).text().replace(/\n/g, '');
                            return name;
                        })
                    );
                    return {
                        name: workerName,
                        link: workerLink,
                        units: units,
                        content: await workerScraper(workerLink),
                    } as Worker;
                })
                .get()
        );
        return workers;
    } catch (error) {
        // @ts-ignore
        if (error?.response?.status === 404) {
            return {
                // @ts-ignore
                status: error.response.status,
                message: 'Sorry! Could not find workers',
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
