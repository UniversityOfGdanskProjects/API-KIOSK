export interface EctsSubjectType {
    subject: string;
    lecture: number | null;
    recitation: number | null;
    labs: number | null;
    pass: string | null;
    ects: number | null;
    major: string | null;
    degree: string | null;
    term: number;
    year: number;
    recruitmentYear: number[];
    speciality?: string;
}
