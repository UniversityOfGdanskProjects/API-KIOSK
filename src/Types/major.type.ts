export interface MajorContent {
    element: string;
    text: string;
}

export interface Major {
    name: string;
    url: string;
    content: MajorContent[];
}
