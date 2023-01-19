export interface PlanEntryFromCSV {
    day: string;
    start: number;
    duration: number;
    subject: string;
    groups?: string[];
    teachers: string[];
    class: string | number;
    type: string;
    info: string[];
    start_date: string;
    end_date: string;
}
