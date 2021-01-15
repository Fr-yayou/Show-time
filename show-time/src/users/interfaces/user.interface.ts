import { Document } from 'mongoose';
export interface User extends Document{
    username:string
    email:string
    password:string
    isAdmin:number
    booked_concert:any    
    whished_concert:any    
    favorite_band:any    
}


export interface SignupRsp {
    readonly email:string
}

export interface LoginRsp {
    readonly token: string
}

