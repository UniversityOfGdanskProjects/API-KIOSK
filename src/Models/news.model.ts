import mongoose from 'mongoose';
import { News, NewsCategory, NewsSource } from '../Types/News.type';

const NewsSchema = new mongoose.Schema<News>({
    leadingPhoto: {
        type: String,
        required: true,
    },
    photos: [
        {
            type: String,
            required: false,
        },
    ],
    link: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    shortBody: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false,
    },
    source: {
        type: String,
        enum: NewsSource,
        required: true,
    },
    category: {
        type: String,
        enum: NewsCategory,
        required: true,
    },
});

export const NewsModel = mongoose.model<News>('News', NewsSchema, 'news');
