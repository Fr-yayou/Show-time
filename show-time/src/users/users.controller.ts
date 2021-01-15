import { Controller,Get,Put,Post,Delete,Body,Param,Request, UseGuards } from '@nestjs/common';
import { UsersService } from "./services/users.service";
import {CreateUserDTO} from "./dto/create-user.dto"
import { User,SignupRsp,LoginRsp } from "./interfaces/user.interface"
import { AuthGuard } from '@nestjs/passport';
import {RolesGuard} from "./auth/guards/roles.guard"
import {Roles } from "./auth/decorators/roles.decorator"


@Controller('users')
export class UsersController {

    constructor(
        private readonly  userService : UsersService,
        ){}


    @Post("signup")
    async signUp(@Body () user: CreateUserDTO): Promise<SignupRsp>{
        return await this.userService.signup(user)
    }

    @Post("signin")
    async logIn(@Body () user:CreateUserDTO): Promise<LoginRsp>{
        return await this.userService.login(user)
    }
    //Apply guards strategy to protect yout end point//
    //We have to use this Guard to protect the route
    // @Roles(1)
    // RolesGuard
    @UseGuards(AuthGuard("jwt"))
    @Get("auth")
    async profile(@Request () req){
        return req.user
    }

    @Get()
    findAll(): Promise <User[]>{
        return this.userService.findAll()
    };

    @Get(":id")
    findOne(@Param("id") id): Promise<User>{
        return this.userService.findOne(id)
    };

    @Delete(':id')
    destroy(@Param('id') id) : Promise<User> {
        return this.userService.delete(id);
    };

    //THOSE TWO ROUTE TO CHECK ASAP

    @Put(':id')
    update(@Body() user: CreateUserDTO, @Param('id') id): Promise<User> {
        return this.userService.update(id,user)
    };
    
    @Post()
    create(@Body () user:CreateUserDTO): Promise<User>{
        return this.userService.create(user)
    };


}
