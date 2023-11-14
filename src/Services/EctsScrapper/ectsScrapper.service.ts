import { getAllDegreeURLs } from './getAlldegreeURL.service';
import { getAllSubjectsDegreeURLs } from './getAllSubjectsURLs.service';
import { scrappedEctsSubjects } from './utils/scrappedEctsSubjects';
import checkSubjects from '../../utils/scrappers/ectsScrapper/checkSubjects';
import { returnScraperError } from '../../utils/errorScraper';
import { scrappedEctsSubjectsType } from './utils/scrappedType';

export const getAllUrls = async () => {
    {
        try {
            const allDegreeURLs = await getAllDegreeURLs();
            const allSubjectsURLs = await getAllSubjectsDegreeURLs(
                allDegreeURLs,
                false
            );

            const specialCases = (
                allSubjectsURLs as scrappedEctsSubjectsType[][]
            )
                .flat()
                .filter((el) => isNaN(parseInt(el.year.slice(0, 4))))
                .map((el) => ({ url: el.url, degree: el.degree }));

            const getSpecialCases = (
                await getAllSubjectsDegreeURLs(specialCases, true)
            ).flat();

            const ogolna = getSpecialCases
                .filter((el) => checkSubjects(el.name))
                .map((el) => ({ url: el.url, degree: el.degree }));

            const ogolnoAkademickaCase = await getAllSubjectsDegreeURLs(
                ogolna,
                true
            );

            const withSpecialCases = allSubjectsURLs
                .concat(getSpecialCases)
                .concat(ogolnoAkademickaCase)
                .flat()
                .filter((el) => parseInt(el.year.slice(0, 4)) < 2023);

            const ectsSubjects = await scrappedEctsSubjects(withSpecialCases);

            return ectsSubjects;
        } catch (error: any) {
            console.log(error);
            return returnScraperError(error);
        }
        // }
    }
};
