import { Document } from 'mongoose';
export interface Feedback extends Document {
    feedback: string;
}
