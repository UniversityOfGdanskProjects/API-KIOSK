export interface WorkerContent {
    email: string;
    posts: string[];
    tutorship: {
        schedule: string;
        link: string;
    };
}

export interface Worker {
    name: string;
    link: string;
    units: string[];
    content: WorkerContent;
}
