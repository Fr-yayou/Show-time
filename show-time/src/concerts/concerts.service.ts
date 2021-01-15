import { Injectable, NotFoundException } from '@nestjs/common'
import { Concert } from "./interfaces/concert.interface"
import {Model} from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class ConcertsService {

    constructor(@InjectModel("Concert") private readonly concertModel:Model<Concert>){}

    async findAll(): Promise <Concert[]>{
        return await this.concertModel.find()
    }

    async findOne(id: string): Promise <Concert>{
        return await this.concertModel.findOne({_id : id}) 
    }

    async create(concert:Concert): Promise <Concert> {
        const newItem = new this.concertModel(concert);
        return await newItem.save()
    }

    async delete(id: string): Promise<Concert> {
        return await this.concertModel.findByIdAndRemove(id);
    };
    
    async update(id: string, concert: Concert): Promise<Concert> {
        return await this.concertModel.findByIdAndUpdate(id, concert, { new: true });
    };
}
