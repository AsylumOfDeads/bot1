"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
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
