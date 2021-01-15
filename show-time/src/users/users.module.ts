import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UserSchema } from "./schemas/user.schema"
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule } from '@nestjs/Config'
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';
import { RolesGuard } from './auth/guards/roles.guard';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({secret:process.env.JWT_SECRET}),
    MongooseModule.forFeature([{name:"User", schema: UserSchema}]),


],
  controllers: [ UsersController],
  providers: [ UsersService,PasswordHasherService,JwtStrategyService,RolesGuard],
})
export class UsersModule {}