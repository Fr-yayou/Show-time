import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackSchema } from "./schemas/feedback.schema"


@Module({
  imports: [MongooseModule.forFeature([{name:"Feedback", schema: FeedbackSchema}])],
  controllers: [ FeedbacksController],
  providers: [ FeedbacksService],
})
export class FeedbacksModule {}