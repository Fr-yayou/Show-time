import { Concert } from "./interfaces/concert.interface";
import { Model } from "mongoose";
export declare class ConcertsService {
    private readonly concertModel;
    constructor(concertModel: Model<Concert>);
    findAll(): Promise<Concert[]>;
    findOne(id: string): Promise<Concert>;
    create(concert: Concert): Promise<Concert>;
    delete(id: string): Promise<Concert>;
    update(id: string, concert: Concert): Promise<Concert>;
}
