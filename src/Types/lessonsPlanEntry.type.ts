export interface LessonsPlanEntry {
    name: string;
    year: number;
    day: string;
    start: number;
    duration: number;
    groups: string[];
    teachers: string[];
    class: string | number;
    pl: {
        subject: string;
        type: string;
        info: string[];
    };
    eng: {
        subject?: string;
        type?: string;
        info?: string[];
    };
}
