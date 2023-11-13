import { getAllDegreeURLs } from './getAlldegreeURL.service';
import { getAllSubjectsDegreeURLs } from './getAllSubjectsURLs.service';
import { scrappedEctsSubjects } from './utils/scrappedEctsSubjects';
import checkSubjects from '../../utils/scrappers/ectsScrapper/checkSubjects';
import { returnScraperError } from '../../utils/errorScraper';

export const getAllUrls = async () => {
    {
        try {
            const allDegreeURLs = await getAllDegreeURLs();
            const allSubjectsURLs = await getAllSubjectsDegreeURLs(
                allDegreeURLs
            );

            const specialCases = allSubjectsURLs
                .filter((el) => checkSubjects(el.name))
                .map((el) => {
                    return { url: el.url, degree: el.degree };
                });

            const getSpecialCases = await getAllSubjectsDegreeURLs(
                specialCases
            );

            const ogolna = allSubjectsURLs
                .filter((el) => checkSubjects(el.name))
                .map((el) => {
                    return { url: el.url, degree: el.degree };
                });
            const ogolnoAkademickaCase =
                ogolna && (await getAllSubjectsDegreeURLs(ogolna));

            const withSpecialCases = allSubjectsURLs
                .concat(getSpecialCases)
                .concat(ogolnoAkademickaCase);

            const ectsSubjects = await scrappedEctsSubjects(withSpecialCases);

            return ectsSubjects;
        } catch (error: any) {
            console.log(error);

            return returnScraperError(error);
        }
    }
};
