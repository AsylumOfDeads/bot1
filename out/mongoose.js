"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_json_1 = require("./json/config.json");
const userSchema_1 = require("./schemas/userSchema");
mongoose_1.default.connect(config_json_1.dblink, {
    useNewUrlParser: true,
});
class Data {
}
exports.Data = Data;
Data.Users = (_a = class {
        static get(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const userData = yield this._userModel.findOne({ id: id });
                if (!userData) {
                    const newUser = new this._userModel({ id: id });
                    yield newUser.save();
                    return newUser;
                }
                return userData;
            });
        }
        static update(id, data) {
            return __awaiter(this, void 0, void 0, function* () {
                const userData = yield this.get(id);
                for (const key in data) {
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                        const value = data[key];
                        userData[key] += value;
                    }
                }
                yield userData.save();
                return userData;
            });
        }
        static set(id, data) {
            return __awaiter(this, void 0, void 0, function* () {
                const userData = yield this.get(id);
                for (const key in data) {
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                        const value = data[key];
                        userData[key] = value;
                    }
                }
                yield userData.save();
                return userData;
            });
        }
    },
    _a._userModel = mongoose_1.default.model("User", userSchema_1.userSchema),
    _a);
