import {Document} from "mongoose"

export class CreateUserDTO extends Document{
    readonly username:string;
    readonly email:string;
    readonly password:string;
    readonly isAdmin:number;
    readonly booked_concert:any    
    readonly whished_concert:any    
    readonly favorite_band:any 
}
