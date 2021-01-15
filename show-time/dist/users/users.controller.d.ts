import { UsersService } from "./services/users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User, SignupRsp, LoginRsp } from "./interfaces/user.interface";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    signUp(user: CreateUserDTO): Promise<SignupRsp>;
    logIn(user: CreateUserDTO): Promise<LoginRsp>;
    profile(req: any): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    destroy(id: any): Promise<User>;
    update(user: CreateUserDTO, id: any): Promise<User>;
    create(user: CreateUserDTO): Promise<User>;
}
