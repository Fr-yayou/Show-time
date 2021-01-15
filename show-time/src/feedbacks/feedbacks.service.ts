import { Injectable } from '@nestjs/common';
import {Feedback} from "./interfaces/feedback.interface"
import {Model} from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class FeedbacksService {

    constructor(@InjectModel("Feedback") private readonly feedbackModel:Model<Feedback>){}

    async findAll(): Promise <Feedback[]>{
        return await this.feedbackModel.find()
    }

    async findOne(id: string): Promise <Feedback>{
        return await this.feedbackModel.findOne({_id : id}) 
    }

    async create(feedback:Feedback): Promise <Feedback> {
        const newItem = new this.feedbackModel(feedback);
        return await newItem.save()
    }

    async delete(id: string): Promise<Feedback> {
        return await this.feedbackModel.findByIdAndRemove(id);
    };
    
    async update(id: string, feedback: Feedback): Promise<Feedback> {
        return await this.feedbackModel.findByIdAndUpdate(id, feedback, { new: true });
    };


}
