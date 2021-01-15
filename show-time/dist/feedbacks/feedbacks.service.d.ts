import { Feedback } from "./interfaces/feedback.interface";
import { Model } from "mongoose";
export declare class FeedbacksService {
    private readonly feedbackModel;
    constructor(feedbackModel: Model<Feedback>);
    findAll(): Promise<Feedback[]>;
    findOne(id: string): Promise<Feedback>;
    create(feedback: Feedback): Promise<Feedback>;
    delete(id: string): Promise<Feedback>;
    update(id: string, feedback: Feedback): Promise<Feedback>;
}
