import { getAllDegreeURLs } from './getAlldegreeURL.service';
import { getAllSubjectsDegreeURLs } from './getAllSubjectsURLs.service';
import { scrappedEctsSubjects } from './utils/scrappedEctsSubjects';
import errorHandler from '../../utils/scrappers/errors/errorHandler';
import {
    defaultMessage,
    internalServerMessage,
    notFoundMessage,
} from './utils/message';
import checkSubjects from '../../utils/scrappers/ectsScrapper/checkSubjects';
import { returnScraperError } from '@/utils/errorScraper';

export const getAllUrls = async () => {
    {
        try {
            const allDegreeURLs = await getAllDegreeURLs();
            const allSubjectsURLs = await getAllSubjectsDegreeURLs(
                allDegreeURLs
            );

            const specialCases = allSubjectsURLs
                .filter((el, _) => checkSubjects(el.name))
                .map((el, _) => {
                    return { url: el.url, degree: el.degree };
                });

            const getSpecialCases = await getAllSubjectsDegreeURLs(
                specialCases
            );

            allSubjectsURLs.concat(getSpecialCases);
            const ectsSubjects = await scrappedEctsSubjects(allSubjectsURLs);

            return ectsSubjects;
        } catch (error: any) {
            return returnScraperError(error);
        }
    }
};
