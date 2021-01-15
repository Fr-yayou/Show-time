import { Document } from 'mongoose';
export declare class CreateFeedbackDto extends Document {
    readonly feedback: string;
    readonly user_id: string;
    readonly concert_id: string;
}
