import { Schema } from "mongoose";

const randomNumber = Math.floor(Math.random() * 99999);

const generatedCodeSchema = new Schema({
    default: randomNumber,
    username: String,
    code:Number,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const GeneratedCode = mongoose.model("GeneratedCode", generatedCodeSchema)