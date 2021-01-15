import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertsModule } from './concerts/concerts.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ConfigModule } from '@nestjs/Config'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GroupsModule, UsersModule, ConcertsModule, FeedbacksModule, MongooseModule.forRoot(process.env.MONGO_URI,{
      useCreateIndex: true,
      useNewUrlParser: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
