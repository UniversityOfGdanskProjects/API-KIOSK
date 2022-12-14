import axios from 'axios';
import { NewsModel } from '../Models/news.model';
export const NewsScheduler = async () => {
    await updateNewsSchema('/scraper/news/inf', 'INF');
    await updateNewsSchema('/scraper/news/mfi', 'MFI');
};

const updateNewsSchema = async (url: string, siteType: string) => {
    let site = process.env.SITE + url;
    await axios
        .get(site)
        .then((data) => {
            NewsModel.find({ site: siteType }, '-_id -__v', (err, result) => {
                if (result) {
                    if (JSON.stringify(data.data) != JSON.stringify(result)) {
                        NewsModel.deleteMany({ site: siteType }, (err) => {
                            if (err) console.log(err);
                            else console.log('no error');
                        });
                        NewsModel.insertMany(data.data)
                            .then(() => {
                                console.log('News inserted');
                            })
                            .catch(() => {
                                console.log('Blad');
                            });
                    }
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
