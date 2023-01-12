import axios from 'axios';
import cheerio from 'cheerio';

const workerScraper = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const name = $('.node-pracownik .field-name-title')
            .text()
            .replace(/\n/gm, '');
        const contact = $('.node-pracownik .group-pracownik-kontakt');
        const phone = contact
            .find('.group-pracownik-kontakt div')
            .first()
            .text();
        const email = contact.find('.group-pracownik-kontakt .e-mail').text();

        const postElements = $('.group-jednostka-stanowisko .term li a');
        const posts = await Promise.all(
            postElements.map(async (idx, post) => {
                const name = $(post).text();
                const endpoint = $(post).attr('href');
                const link = 'https://old.mfi.ug.edu.pl' + endpoint;
                return { name, link };
            })
        );
        const tutorship = {
            schedule: $('#terminy_konsultacji p')
                .get()
                .reduce((acc, p) => (acc += $(p).text() + '\n'), ''),
            link: $('#terminy_konsultacji a').attr('href') || '',
        };
        const worker = {
            name: name,
            phone: phone,
            email: email,
            posts: posts,
            tutorship: tutorship,
        };
        return worker;
    } catch (error) {
        console.log(error);
    }
};

export const workersScraper = async () => {
    try {
        const url = 'https://old.mfi.ug.edu.pl/pracownicy_mfi/sklad_osobowy';
        const { data } = await axios.get(url);
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
                        unitElements.map(async (index, elem) => {
                            const name = $(elem).text().replace(/\n/g, '');
                            const link =
                                'https://old.mfi.ug.edu.pl' +
                                $(elem).attr('href');
                            return { name, link };
                        })
                    );
                    return {
                        name: workerName,
                        link: workerLink,
                        units: units,
                        content: await workerScraper(workerLink),
                    };
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
