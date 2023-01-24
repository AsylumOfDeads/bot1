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
const mongoose_1 = require("../mongoose");
module.exports = {
    name: "voiceStateUpdate",
    execute(oldState, newState) {
        return __awaiter(this, void 0, void 0, function* () {
            if (oldState.channelId !== newState.channelId) {
                if (newState.channelId) {
                    const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                        if (!newState.channelId) {
                            clearInterval(interval);
                            return;
                        }
                        yield mongoose_1.Data.Users.update(newState.id, { voice: 1 });
                        yield mongoose_1.Data.Users.update(newState.id, { balance: 1 });
                        const daysPassed = Math.floor(Date.now() / 86400000);
                        const userData = yield mongoose_1.Data.Users.get(newState.id);
                        if (userData.voiceLastDay !== daysPassed) {
                            yield mongoose_1.Data.Users.set(newState.id, { voiceToday: 1, voiceLastDay: daysPassed });
                        }
                        else {
                            yield mongoose_1.Data.Users.update(newState.id, { voiceToday: 1 });
                        }
                    }), 3000);
                }
            }
        });
    }
};
