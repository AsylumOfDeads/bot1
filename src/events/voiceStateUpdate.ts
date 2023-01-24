import { VoiceState } from "discord.js";
import { Data } from "../mongoose";

export = {
    name: "voiceStateUpdate",
    async execute(oldState: VoiceState, newState: VoiceState) {
        if (oldState.channelId !== newState.channelId) {
            if (newState.channelId) {
                const interval = setInterval(async () => {
                    if (!newState.channelId) {
                        clearInterval(interval);
                        return;
                    }
                    await Data.Users.update(newState.id, { voice: 1 });
                    await Data.Users.update(newState.id, { balance: 1 });
                    const daysPassed = Math.floor(Date.now() / 86400000);
                    const userData = await Data.Users.get(newState.id);
                    if (userData.voiceLastDay !== daysPassed) {
                        await Data.Users.set(newState.id, { voiceToday: 1, voiceLastDay: daysPassed });
                    } else {
                        await Data.Users.update(newState.id, { voiceToday: 1 });
                    }
                }, 60000);
            }
        }
    }
}