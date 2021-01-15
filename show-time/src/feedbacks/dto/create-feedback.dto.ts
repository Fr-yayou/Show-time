import mongoose, { Document } from 'mongoose';

export class CreateFeedbackDto extends Document{
    readonly feedback:string;
    readonly user_id:string;
    readonly concert_id:string;   
}
