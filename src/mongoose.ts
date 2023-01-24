import mongoose, { ConnectOptions } from "mongoose";
import { dblink } from "./json/config.json"
import { userSchema } from "./schemas/userSchema";

mongoose.connect(dblink, {
    useNewUrlParser: true,
} as ConnectOptions);

export class Data {
    public static Users = class {
        static _userModel = mongoose.model("User", userSchema);
        static async get(id: string) {
            const userData = await this._userModel.findOne({ id: id });
            if (!userData) {
                const newUser = new this._userModel({ id: id });
                await newUser.save();
                return newUser;
            }
            return userData;
        }
        static async update(id: string, data: any) {
            const userData = await this.get(id);
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    userData[key] += value;
                }
            }
            await userData.save();
            return userData;
        }
        static async set(id: string, data: any) {
            const userData = await this.get(id);
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    userData[key] = value;
                }
            }
            await userData.save();
            return userData;
        }
    }
}