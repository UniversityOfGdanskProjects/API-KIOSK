import axios from 'axios';
import cheerio from 'cheerio';

export const mainEctsUrl = 'https://mfi.ug.edu.pl';

const degreeURL =
    '/studenci/plany-zajec-i-programy-studiow/aktualne-programy-studiow';

export const getAllDegreeURLs = async () => {
    try {
        const { data } = await axios.get(mainEctsUrl + degreeURL);
        const $ = cheerio.load(data);

        const allDegreeURLs = $('a.btn-frame')
            .map((_, element) => {
                return {
                    url: element.attribs.href,
                    degree: $(element).text(),
                };
            })
            .get();

        return allDegreeURLs;
    } catch (error) {
        return [];
    }
};
