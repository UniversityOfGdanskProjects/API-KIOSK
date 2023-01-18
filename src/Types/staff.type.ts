export interface AcademicContent {
    email: string;
    posts: string[];
    tutorial: string;
}

export interface Academic {
    name: string;
    link: string;
    units: string[];
    content: AcademicContent;
}
