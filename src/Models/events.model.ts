import mongoose from 'mongoose';
import { Events } from '../Types/events.type';

const EventsSchema = new mongoose.Schema<Events>({
    name: { type: String },
    link: { type: String },
    content: {
        header: { type: String },
        text: [
            {
                type: String,
            },
        ],
    },
});

export const EventsModel = mongoose.model<Events>(
    'events',
    EventsSchema,
    'events'
);
