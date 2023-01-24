import mongoose from "mongoose";
export declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    voice: number;
    voiceToday: number;
    voiceLastDay: number;
    balance: number;
    id?: string;
}>;
