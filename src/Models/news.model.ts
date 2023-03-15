import mongoose from 'mongoose';
import { News, NewsCategory, NewsSource } from '../Types/News.type';

const NewsSchema = new mongoose.Schema<News>({
    photo: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    shortBody: [
        {
            type: String,
            required: false,
        },
    ],
    body: [
        {
            type: String,
            required: true,
        },
    ],
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
