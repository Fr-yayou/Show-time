import { Document } from 'mongoose';
export interface Feedback extends Document {
    feedback: string;
    user_id: string;
    concert_id: string;
}
