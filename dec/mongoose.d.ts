import mongoose from "mongoose";
export declare class Data {
    static Users: {
        new (): {};
        _userModel: mongoose.Model<{
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        }>>;
        get(id: string): Promise<mongoose.Document<unknown, any, {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        }> & {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        } & {
            _id: mongoose.Types.ObjectId;
        }>;
        update(id: string, data: any): Promise<mongoose.Document<unknown, any, {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        }> & {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        } & {
            _id: mongoose.Types.ObjectId;
        }>;
        set(id: string, data: any): Promise<mongoose.Document<unknown, any, {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        }> & {
            voice: number;
            voiceToday: number;
            voiceLastDay: number;
            balance: number;
            id?: string;
        } & {
            _id: mongoose.Types.ObjectId;
        }>;
    };
}
