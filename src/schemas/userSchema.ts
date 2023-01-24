import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    id: String,
    voice: {
        type: Number,
        default: 0
    },
    voiceToday: {
        type: Number,
        default: 0
    },
    voiceLastDay: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    }
});