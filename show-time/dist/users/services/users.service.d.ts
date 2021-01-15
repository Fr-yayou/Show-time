import { User, SignupRsp, LoginRsp } from "../interfaces/user.interface";
import { Model } from "mongoose";
import { CreateUserDTO } from "../dto/create-user.dto";
import { PasswordHasherService } from '../auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private readonly userModel;
    private readonly hasherService;
    private jwtService;
    constructor(userModel: Model<User>, hasherService: PasswordHasherService, jwtService: JwtService);
    signup(doc: CreateUserDTO): Promise<SignupRsp>;
    login(doc: CreateUserDTO): Promise<LoginRsp>;
    findAll(): Promise<User[]>;
    validateUserById(userId: string): Promise<boolean>;
    findOne(id: string): Promise<User>;
    delete(id: string): Promise<User>;
    update(id: string, user: User): Promise<User>;
    create(user: User): Promise<User>;
}
