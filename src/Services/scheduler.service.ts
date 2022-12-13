import axios from 'axios';

export const NewsScheduler = () => {
    const addresses = [
        {
            url: '/news/inf',
            database: 'news-inf',
        },
        {
            url: '/news/mfi',
            database: 'news-mfi',
        },
    ];
    addresses.map((element) => {
        let site = process.env.SITE + element.url;
        axios
            .get(site)
            .then((data) => {
                console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
