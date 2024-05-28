import mongoose, { Schema, mongo } from "mongoose";

const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    uniqueCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeneratedCode"
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


export const Message = mongoose.model("Message" , messageSchema)
//in MongoDb it will be saved as 'messages'