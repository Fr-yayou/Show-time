import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema({
    username : {type:String, required:true, unique:true,minimum:2},
    email: {type:String, required:true,unique:true,minimum:6 },
    password:{type:String, required:true,unique:false},
    isAdmin:{type:String,default:0, nullable:true},
    booked_concert:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Concert"
        }
    ],
    whished_concert:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Concert"
        }
    ],
    favorite_band:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group"
        }
    ]

})
