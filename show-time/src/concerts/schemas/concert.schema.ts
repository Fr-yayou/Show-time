import * as mongoose from "mongoose"

export const ConcertSchema = new mongoose.Schema({
    name_concert: { type: String, required: true },
    name_group: [{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required: true 
    }],
    date: { type: String, required: true },
    genre: { type: Array, required: true },
    max_tickets: { type: Number, required: true },
})
