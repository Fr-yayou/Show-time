import { Document } from 'mongoose';
export declare class CreateUserDto extends Document {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: number;
}
