import mongoose from 'mongoose';
import { Degree } from '../Types/degree.type';
import { Major } from '../Types/major.type';

const MajorSchema = new mongoose.Schema<Major>({
    name: {
        PL: { type: String, required: true },
        EN: { type: String },
    },
    url: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    content: {
        PL: { type: String, required: true },
        EN: { type: String },
    },
    degree: {
        type: String,
        required: true,
        enum: Degree,
    },
});

export const MajorModel = mongoose.model<Major>(
    'Majors',
    MajorSchema,
    'majors'
);
