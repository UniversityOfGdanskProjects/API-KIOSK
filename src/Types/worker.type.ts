export interface WorkerContent {
    name: string;
    email: string;
    posts: {
        name: string;
        link: string;
    }[];
    tutorship: {
        schedule: string;
        link: string;
    };
}

export interface Worker {
    name: string;
    link: string;
    units: {
        name: string;
        link: string;
    }[];
    content: WorkerContent;
}
