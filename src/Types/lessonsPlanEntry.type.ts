export interface LessonsPlanEntry {
    day: string;
    start: number;
    duration: number;
    subject: string;
    group?: string;
    teacher: string;
    class: string | number;
    type: string;
    info: string[];
    start_date: string;
    end_date: string;
    isFaculty: boolean;
    isSeminar: boolean;
}
