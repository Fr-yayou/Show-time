import { Controller,Get,Put,Post,Delete,Body,Param } from '@nestjs/common';
import { FeedbacksService } from "./feedbacks.service";
import {CreateFeedbackDto} from "./dto/create-feedback.dto"
import { Feedback } from "./interfaces/feedback.interface"


@Controller('feedbacks')
export class FeedbacksController {

    constructor(private readonly  feedbacksService : FeedbacksService){}

    @Get()
    findAll(): Promise <Feedback[]>{
        return this.feedbacksService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id): Promise<Feedback>{
        return this.feedbacksService.findOne(id)
    }

    @Post()
    create(@Body () CreateFeedbackDto : CreateFeedbackDto): Promise <Feedback>{
        return this.feedbacksService.create(CreateFeedbackDto);
    }

    @Delete(':id')
    destroy(@Param('id') id) : Promise<Feedback> {
        return this.feedbacksService.delete(id);
    };

    @Put(':id')
    update(@Body() updateFeedbackDto: CreateFeedbackDto, @Param('id') id): Promise<Feedback> {
        return this.feedbacksService.update(id, updateFeedbackDto)
    };
}
