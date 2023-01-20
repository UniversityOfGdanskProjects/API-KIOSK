import { checkIfFaculty } from '../utils/lessonsPlanScrapper/checkIfFaculty';
import { LessonsPlanURLObject } from '../Types/lessonsPlanURLObject.type';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';
import { PlanEntryFromCSV } from '../Types/planEntryFromCSV.type';
import {
    getYearFromMajorName,
    getURLWithoutQuery,
    transformCSVHeader,
    transformGroupName,
    transformCSVField,
} from '../utils/lessonsPlanScrapper';
import cheerio from 'cheerio';
import Papa from 'papaparse';
import * as _ from 'lodash';
import axios from 'axios';
import { ErrorType } from 'Types/error.type';

export const getDataFromCSV = async (
    url: string,
    classType: 'main' | 'seminar' | 'faculty',
    majorName: string
): Promise<LessonsPlanEntry[]> => {
    try {
        const mapResult = (
            entryFromCSV: PlanEntryFromCSV,
            mainGroupName: string
        ): LessonsPlanEntry => {
            const {
                subject,
                groups,
                type,
                info,
                start_date,
                end_date,
                ...rest
            } = entryFromCSV;

            const { name, year } = getYearFromMajorName(majorName);

            const entryGroup = groups
                ? groups.map((group) =>
                      transformGroupName(mainGroupName, group)
                  )
                : [];

            if (entryGroup.length === 0)
                entryGroup.push(
                    classType === 'faculty' ? 'fakultet' : 'seminarium'
                );

            const result: LessonsPlanEntry = {
                name: name,
                year: year,
                ...rest,
                groups: entryGroup,
                pl: {
                    subject: subject,
                    type: type,
                    info: info,
                },
                eng: {},
            };

            return result;
        };

        const parserConfig = {
            header: true,
            dynamicTyping: true,
            transformHeader: transformCSVHeader,
            transform: transformCSVField,
        };

        const csv = await axios.get(
            `https://inf.ug.edu.pl/plan/${url}&format=csv`
        );

        const results: PlanEntryFromCSV[] = Papa.parse<PlanEntryFromCSV>(
            csv.data,
            parserConfig
        ).data;

        const withoutEmptyLines = results.filter(
            (result) => Object.keys(result).length > 1
        );

        const finalResults = withoutEmptyLines.map((result) => {
            if (
                url.startsWith('fiz/') &&
                !majorName.includes('bezpieczeństwo jądrowe')
            ) {
                const [, mainGroupName] = url.split('=');

                return mapResult(result, mainGroupName);
            }

            return mapResult(result, majorName);
        });

        return finalResults;
    } catch (error) {
        return [];
    }
};

const getAllUrls = async (
    currentURL: string
): Promise<LessonsPlanURLObject> => {
    try {
        const mainURL = 'https://inf.ug.edu.pl/plan/';

        const { data } = await axios.get(mainURL + currentURL);
        const $ = cheerio.load(data);
        const name = $('div > h1').text();

        const planURLObject: LessonsPlanURLObject = {
            name: name,
            main: currentURL,
        };

        const otherURLs = $('div.uwaga > a')
            .map((index, element) => element.attribs.href)
            .get();

        for (let i = 0; i < 2; i++) {
            if (otherURLs[i]) {
                const url = getURLWithoutQuery(otherURLs[i]);
                if (checkIfFaculty(url)) planURLObject.faculty = url;
                else planURLObject.seminar = url;
            }
        }

        return planURLObject;
    } catch {
        return { name: '', main: '' };
    }
};

const getPlansURLs = async (): Promise<LessonsPlanURLObject[]> => {
    try {
        const url = 'https://inf.ug.edu.pl/plan/';

        const mainLessonsPlansPage = await axios.get(url + '?dialog=grupa');

        const $1 = cheerio.load(mainLessonsPlansPage.data);

        const majorsURLs = $1('#groups > div > a')
            .map((index, element) => element.attribs.href)
            .get();

        const mainMajorsURLs = majorsURLs.splice(0, majorsURLs.length - 1);

        const otherLessonsPlansPage = await axios.get(url + 'fiz/');

        const $2 = cheerio.load(otherLessonsPlansPage.data);

        const otherURls = $2('#groups > div > a')
            .map((index, element) => 'fiz/' + element.attribs.href)
            .get();

        const otherMajorsURLs = otherURls.splice(0, otherURls.length - 3);

        const allMajorsPlanURLs = await Promise.all(
            [...mainMajorsURLs, ...otherMajorsURLs].map(getAllUrls)
        );

        return allMajorsPlanURLs;
    } catch (error) {
        return [];
    }
};

export const lessonPlansScrapper = async (): Promise<
    LessonsPlanEntry[] | ErrorType
> => {
    try {
        const plansURLObjects = await getPlansURLs();

        if (!plansURLObjects)
            return {
                status: 500,
                message: "Couldn't find any lessons plans URLs",
            };

        const allLessonsPlans = await Promise.all(
            plansURLObjects.map(async (url: LessonsPlanURLObject) => {
                const allLessons = [];

                const mainLessons = await getDataFromCSV(
                    url.main,
                    'main',
                    url.name
                );
                allLessons.push(...mainLessons);

                if (url.faculty) {
                    const facultyLessons = await getDataFromCSV(
                        url.faculty,
                        'faculty',
                        url.name
                    );
                    allLessons.push(...facultyLessons);
                }

                if (url.seminar) {
                    const seminarLessons = await getDataFromCSV(
                        url.seminar,
                        'seminar',
                        url.name
                    );
                    allLessons.push(...seminarLessons);
                }

                return allLessons;
            })
        );

        const result = allLessonsPlans.reduce((acc, lessonsArray) => {
            acc.push(...lessonsArray);

            return acc;
        }, []);

        return result;
    } catch (error: any) {
        if (error.response.status === 404) {
            return {
                status: error.response.status,
                message: 'Sorry! Lessons plan sites are not responding',
            };
        }

        if (error.response.status) {
            return {
                status: error.response.status,
                message: 'Something went wrong with one of the requests',
            };
        }

        return {
            status: 500,
            message: 'Something went wrong with lessons plan scrapper',
        };
    }
};
