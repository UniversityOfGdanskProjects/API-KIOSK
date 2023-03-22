import mongoose from 'mongoose';
import { Major } from 'Types/major.type';

const MajorSchema = new mongoose.Schema<Major>({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
    },
    content: [
        {
            element: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
        },
    ],
});

export const MajorModel = mongoose.model<Major>(
    'Majors',
    MajorSchema,
    'majors'
);
