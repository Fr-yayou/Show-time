import * as mongoose from "mongoose"

export const FeedbackSchema = new mongoose.Schema({
    feedback : String,
    user_id: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true 
    },
    concert_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Concert",
        required: true 
    }
})
