import { MajorLessonsPlanObject } from '../Types/majorLessonsPlanObject.type';
import { LessonsPlanURLObject } from '../Types/lessonsPlanURLObject.type';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';
import { getURLWithoutQuery } from '../utils/getURLWithoutQuery';
import { transformCSVHeader } from '../utils/transformCSVHeader';
import { transformCSVField } from '../utils/transformCSVField';
import { checkIfFaculty } from '../utils/checkIfFaculty';
import cheerio from 'cheerio';
import Papa from 'papaparse';
import * as _ from 'lodash';
import axios from 'axios';

const getDataFromCSV = async (
    url: string,
    type: 'main' | 'seminar' | 'faculty'
): Promise<LessonsPlanEntry[]> => {
    try {
        const parserConfig = {
            header: true,
            dynamicTyping: true,
            transformHeader: transformCSVHeader,
            transform: transformCSVField,
        };

        const csv = await axios.get(
            `https://inf.ug.edu.pl/plan/${url}&format=csv`
        );

        const results = Papa.parse(csv.data, parserConfig).data;

        const withoutLastLine = results.splice(0, results.length - 1);

        const finalResults: Array<LessonsPlanEntry> = withoutLastLine.map(
            (result: any) => {
                result.isFaculty = type === 'faculty';

                if (type === 'seminar') {
                    result.type = 'seminarium';
                }

                return result;
            }
        );

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
        const planURLObject: LessonsPlanURLObject = { name: '', main: '' };

        planURLObject.main = currentURL;

        const { data } = await axios.get(mainURL + currentURL);
        const $ = cheerio.load(data);
        const name = $('div > h1').text();
        planURLObject.name = name;

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
    Array<MajorLessonsPlanObject>
> => {
    try {
        const plansURLObjects = await getPlansURLs();

        const allLessonsPlans = await Promise.all(
            plansURLObjects.map(async (url: LessonsPlanURLObject) => {
                const allLessons = [];

                const mainLessons = await getDataFromCSV(url.main, 'main');

                allLessons.push(...mainLessons);

                if (url.faculty) {
                    const facultyLessons = await getDataFromCSV(
                        url.faculty,
                        'faculty'
                    );
                    allLessons.push(...facultyLessons);
                }

                if (url.seminar) {
                    const seminarLessons = await getDataFromCSV(
                        url.seminar,
                        'seminar'
                    );
                    allLessons.push(...seminarLessons);
                }

                const grouped = _.groupBy(allLessons, 'day');
                return { [`${url.name}`]: grouped };
            })
        );

        return allLessonsPlans;
    } catch {
        return [];
    }
};
