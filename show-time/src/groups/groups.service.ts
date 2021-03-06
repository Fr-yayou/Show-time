import { Injectable } from '@nestjs/common';
import {Group} from "./interfaces/group.interface"
import {Model} from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class GroupsService {

    constructor(@InjectModel("Group") private readonly groupModel:Model<Group>){}

    async findAll(): Promise <Group[]>{
        return await this.groupModel.find()
    }

    async findOne(id: string): Promise <Group>{
        return await this.groupModel.findOne({_id : id}) 
    }

    async create(group:Group): Promise <Group> {
        const newItem = new this.groupModel(group);
        return await newItem.save()
    }

    async delete(id: string): Promise<Group> {
        return await this.groupModel.findByIdAndRemove(id);
    };
    
    async update(id: string, group: Group): Promise<Group> {
        return await this.groupModel.findByIdAndUpdate(id, group, { new: true });
    };


}
