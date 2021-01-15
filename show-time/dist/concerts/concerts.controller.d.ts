import { ConcertsService } from "./concerts.service";
import { CreateConcertDto } from "./dto/create-concert.dto";
import { Concert } from "./interfaces/concert.interface";
export declare class ConcertsController {
    private readonly concertsService;
    constructor(concertsService: ConcertsService);
    findAll(): Promise<Concert[]>;
    findOne(id: any): Promise<Concert>;
    create(CreateConcertDto: CreateConcertDto): Promise<Concert>;
    destroy(id: any): Promise<Concert>;
    update(updateConcertDto: CreateConcertDto, id: any): Promise<Concert>;
}
