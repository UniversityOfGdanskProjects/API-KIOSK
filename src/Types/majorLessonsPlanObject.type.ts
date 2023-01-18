import { LessonsPlanEntry } from './lessonsPlanEntry.type';

export interface MajorLessonsPlanObject {
    [index: string]: {
        [index: string]: LessonsPlanEntry[];
    };
}
