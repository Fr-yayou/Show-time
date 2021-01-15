import { Injectable, UnauthorizedException } from '@nestjs/common';
import {User,SignupRsp,LoginRsp} from "../interfaces/user.interface"
import {Model} from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import {CreateUserDTO} from "../dto/create-user.dto"
import { PasswordHasherService } from '../auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(
        //The "User" come from the import in the user-module file
        @InjectModel("User") 
        //Inject the schema for mongoDB//
        private readonly userModel:Model<User>,
        private readonly hasherService: PasswordHasherService,
        private jwtService: JwtService,
        
        ){}
        
        
        async signup(doc:CreateUserDTO): Promise<SignupRsp>{
            //Check if user already in DB //
            const userEmail = await this.userModel.findOne({email:doc.email})
            if(userEmail){
                throw new UnauthorizedException(`User already register with this email: ${doc.email}`)
            }
            const userName = await this.userModel.findOne({ username: doc.username })
            if (userName) {
                throw new UnauthorizedException(`User already register with this username: ${doc.username}`)
            }
            //encrypte password before save in db//
            // Use await beause this method return a promise
            const encryptedPassword = await this.hasherService.hashPassword(doc.password)

            const newUser = new this.userModel({username:doc.username,email:doc.email,password:encryptedPassword})
            await newUser.save()
            // We only return the email for security //
            return {email:newUser.email}
        }

        async login(doc:CreateUserDTO): Promise<LoginRsp>{
            //verify user email//
            const user = await this.userModel.findOne({email:doc.email})
            if(!user)
            throw new UnauthorizedException(
                `Could not found any user with this email ${doc.email}`
            )
            //verify user password//
            const matchedPassword = await this.hasherService.comparePassword(doc.password,user.password)
            if(matchedPassword){
                const token = await this.jwtService.signAsync({email:user.email, id:user._id,isAdmin:user.isAdmin,username:user.username},{expiresIn:"1d"})
                return {token}
            }else{
                throw new UnauthorizedException(
                    `Invalid password`
                )
            }
            //generate JSON web token//

        }
        
        async findAll(): Promise <User[]>{
        return await this.userModel.find()

        };

        async validateUserById(userId:string) : Promise<boolean>{
            const user = await this.userModel.findById(userId);

            if(user){
                return true
            }else{
                return false
            }
        }

        async findOne(id: string): Promise <User>{
            return await this.userModel.findOne({_id : id}) 
        };

        async delete(id: string): Promise<User> {
            return await this.userModel.findByIdAndRemove(id);
        };
        
        async update(id: string, user: User): Promise<User> {
            return await this.userModel.findByIdAndUpdate(id, user, { new: true });
        };
    
        async create(user:User): Promise <User> {
            const newUser = new this.userModel(user);
            return await newUser.save()
        };

}