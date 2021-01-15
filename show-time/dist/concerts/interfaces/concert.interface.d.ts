import { Document } from 'mongoose';
export interface Concert extends Document {
    name_concert: string;
    name_group: any;
    date: string;
    genre: any;
    max_tickets: number;
}
