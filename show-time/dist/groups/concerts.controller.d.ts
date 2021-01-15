import { ConcertsService } from "./concerts.service";
export declare class ConcertsController {
    private readonly concertsService;
    constructor(concertsService: ConcertsService);
    addConcert(nameConcert: string, nameGroup: any, dateConcert: string, genreConcert: any, maxTickets: number): Promise<{
        id: string;
    }>;
    getAllConcerts(): Promise<{
        id: string;
        name_concert: string;
        name_group: any;
        date: string;
        genre: any;
        max_tickets: number;
    }[]>;
    getConcert(concertId: string): Promise<{
        id: string;
        name_concert: string;
        name_group: any;
        date: string;
        genre: any;
        max_tickets: number;
    }>;
    updateConcert(concertId: string, nameConcert: string, nameGroup: any, dateConcert: string, genreConcert: any, maxTickets: number): Promise<any>;
    removeConcert(concertId: string): Promise<any>;
}
