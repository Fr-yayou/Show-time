import { Controller,Get,Put,Post,Delete,Body,Param } from '@nestjs/common';
import { ConcertsService } from "./concerts.service";
import {CreateConcertDto} from "./dto/create-concert.dto"
import { Concert } from "./interfaces/concert.interface"


@Controller('concerts')
export class ConcertsController {

    constructor(private readonly concertsService : ConcertsService){}

    @Get()
    findAll(): Promise <Concert[]>{
        return this.concertsService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id): Promise<Concert>{
        return this.concertsService.findOne(id)
    }

    @Post()
    create(@Body () CreateConcertDto : CreateConcertDto): Promise <Concert>{
        return this.concertsService.create(CreateConcertDto);
    }

    @Delete(':id')
    destroy(@Param('id') id) : Promise<Concert> {
        return this.concertsService.delete(id);
    };

    @Put(':id')
    update(@Body() updateConcertDto: CreateConcertDto, @Param('id') id): Promise<Concert> {
        return this.concertsService.update(id, updateConcertDto)
    };

}