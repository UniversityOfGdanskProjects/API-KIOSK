import mongoose from 'mongoose';
import { Academic } from '../Types/staff.type';

const StaffSchema = new mongoose.Schema<Academic>({
    name: { type: String },
    link: { type: String },
    units: [{ type: String }],
    content: {
        email: { type: String },
        posts: [
            {
                position: {
                    type: String,
                },
                faculty: [
                    {
                        type: String,
                    },
                ],
            },
        ],
        tutorial: { type: String },
    },
});

export const StaffModel = mongoose.model<Academic>(
    'Staff',
    StaffSchema,
    'staff'
);
