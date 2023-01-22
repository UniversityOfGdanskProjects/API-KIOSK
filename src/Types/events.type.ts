export interface EventsContent {
    header: string;
    text: string[];
}

export interface Events {
    name: string;
    link: string;
    content: EventsContent;
}
