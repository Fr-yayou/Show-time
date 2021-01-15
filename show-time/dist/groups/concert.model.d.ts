import * as mongoose from 'mongoose';
export declare const ConcertSchema: mongoose.Schema<any>;
export interface Concert extends mongoose.Document {
    id: string;
    name_concert: string;
    name_group: any;
    date: string;
    genre: any;
    max_tickets: number;
}
