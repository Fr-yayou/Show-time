import mongoose, { Document } from 'mongoose';

export class CreateGroupDto extends Document{
    readonly name_group:string;   
}
