export interface News {
    photo: string;
    link: string;
    datetime: string;
    title: string;
    shortBody: string[];
    body: string[];
    source: string;
    category: NewsCategory;
}

export enum NewsCategory {
    NEWS = 'NEWS',
    STUDENTS = 'STUDENTS',
    ARCHIVE = 'ARCHIVE',
}
