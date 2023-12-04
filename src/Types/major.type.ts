import { Degree } from './degree.type';

export interface Major {
    name: {
        PL: string;
        EN?: string;
    };
    url: string;
    content: { PL: string | null; EN?: string | null };
    degree: Degree;
}

export interface MajorOutput {
    name: string;
    url: string;
    content: string;
    degree: Degree;
}
