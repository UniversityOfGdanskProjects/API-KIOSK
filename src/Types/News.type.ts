export interface News {
    photo: string;
    link: string;
    datetime: string;
    title: string;
    shortBody: string[];
    body: string[];
    site: string;
    category: NewsCategoryEnum;
}

export enum NewsCategoryEnum {
    NEWS = 'NEWS',
    STUDENTS = 'STUDENTS',
    ARCHIVE = 'ARCHIVE',
}
