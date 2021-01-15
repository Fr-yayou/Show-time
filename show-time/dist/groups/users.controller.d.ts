import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
}
