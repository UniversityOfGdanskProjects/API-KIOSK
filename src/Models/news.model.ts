import mongoose from 'mongoose';
import { News } from 'Types/News.type';

const NewsSchema = new mongoose.Schema<News>({
    site: {
        type: String,
        required: true,
    },
    content: [
        {
            subSection: {
                type: String,
                required: true,
            },
            posts: [
                {
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
                    shortBody: {
                        type: String,
                        required: false,
                    },
                    body: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
});

export const NewsModel = mongoose.model<News>('News', NewsSchema, 'news');
