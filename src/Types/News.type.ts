export interface News {
    photo: string;
    link: string;
    datetime: Date;
    title: string;
    shortBody: string[];
    body: string[];
    source: NewsSource;
    category: NewsCategory;
}

export enum NewsCategory {
    NEWS = 'NEWS',
    STUDENTS = 'STUDENTS',
    ARCHIVE = 'ARCHIVE',
}

export enum NewsSource {
    INF = 'INF',
    MFI = 'MFI',
}
