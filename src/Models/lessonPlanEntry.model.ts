import mongoose from 'mongoose';
import { LessonsPlanEntry } from '../Types/lessonsPlanEntry.type';

const LessonsPlanEntrySchema = new mongoose.Schema<LessonsPlanEntry>({
    name: { type: String },
    year: { type: Number },
    day: { type: String },
    start: { type: Number },
    duration: { type: Number },
    groups: [{ type: String }],
    teachers: [{ type: String }],
    class: mongoose.Schema.Types.Mixed,
    pl: {
        subject: { type: String },
        type: { type: String },
        info: [{ type: String }],
    },
    eng: {
        subject: { type: String },
        type: { type: String },
        info: [{ type: String }],
    },
});

export const LessonsModel = mongoose.model<LessonsPlanEntry>(
    'lessons',
    LessonsPlanEntrySchema,
    'lessons'
);
