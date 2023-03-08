export interface NewsPost {
    photo: string;
    link: string;
    datetime: string;
    title: string;
    shortBody: string;
    body: string;
}

export interface NewsContent {
    subSection: string;
    posts: NewsPost[];
}

export interface News {
    site: string;
    content: NewsContent[];
}
