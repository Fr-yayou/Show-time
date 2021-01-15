import { FeedbacksService } from "./feedbacks.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { Feedback } from "./interfaces/feedback.interface";
export declare class FeedbacksController {
    private readonly feedbacksService;
    constructor(feedbacksService: FeedbacksService);
    findAll(): Promise<Feedback[]>;
    findOne(id: any): Promise<Feedback>;
    create(CreateFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    destroy(id: any): Promise<Feedback>;
    update(updateFeedbackDto: CreateFeedbackDto, id: any): Promise<Feedback>;
}
