import { EctsSubjectType } from 'Types/EctsScrapper/ectsSubject';
import { LessonsPlanEntry } from 'Types/lessonsPlanEntry.type';
import mongoose from 'mongoose';

const ectsScrapperEntrySchema = new mongoose.Schema<EctsSubjectType>({
    subject: { type: String },
    lecture: { type: Number },
    recitation: { type: Number },
    labs: { type: Number },
    pass: { type: String },
    degree: { type: String },
    ects: { type: Number },
    major: { type: String },
    recruitmentYear: { type: [Number] },
    term: { type: Number },
    year: { type: Number },
});

export const EctsModel = mongoose.model<EctsSubjectType>(
    'ectsScrapper',
    ectsScrapperEntrySchema,
    'EctsScrapper'
);
