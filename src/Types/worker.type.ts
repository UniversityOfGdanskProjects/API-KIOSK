export interface WorkerContent {
    email: string;
    posts: Array<string>;
    tutorship: {
        schedule: string;
        link: string;
    };
}

export interface Worker {
    name: string;
    link: string;
    units: Array<string>;
    content: WorkerContent;
}
