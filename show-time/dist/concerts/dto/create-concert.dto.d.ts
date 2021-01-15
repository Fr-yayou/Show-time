import { Document } from 'mongoose';
export declare class CreateConcertDto extends Document {
    readonly name_concert: string;
    readonly name_group: string;
    readonly date: string;
    readonly genre: any;
    readonly max_tickets: number;
}
