import { Model } from 'mongoose';
import { Concert } from './concert.model';
export declare class ConcertsService {
    private readonly concertModel;
    constructor(concertModel: Model<Concert>);
    insertConcert(name_concert: string, name_group: any, date: string, genre: any, max_tickets: number): Promise<string>;
    getConcerts(): Promise<{
        id: string;
        name_concert: string;
        name_group: any;
        date: string;
        genre: any;
        max_tickets: number;
    }[]>;
    getSingleConcert(concertId: string): Promise<{
        id: string;
        name_concert: string;
        name_group: any;
        date: string;
        genre: any;
        max_tickets: number;
    }>;
    deleteConcert(concertId: string): Promise<void>;
    updateConcert(concertId: string, name_concert: string, name_group: any, date: string, genre: any, max_tickets: number): Promise<void>;
    private findConcert;
}
