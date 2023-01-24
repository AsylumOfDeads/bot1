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
const discord_js_1 = require("discord.js");
const EmbedComponents_1 = require("../components/EmbedComponents");
const mongoose_1 = require("../mongoose");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("profile")
        .setDescription("Показывает профиль пользователя")
        .addUserOption(option => option
        .setName("user")
        .setDescription("Пользователь")
        .setRequired(false)),
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = interaction.options.getUser("user") || interaction.user;
            const member = interaction.member;
            const userData = yield mongoose_1.Data.Users.get(user.id);
            const userStatus = (_a = member.presence) === null || _a === void 0 ? void 0 : _a.status;
            if (!userData)
                return yield interaction.reply((0, EmbedComponents_1.errorEmbed)("Пользователь не найден"));
            const daysPassed = Math.floor(Date.now() / 86400000);
            userData.voiceToday = userData.voiceLastDay === daysPassed ? userData.voiceToday : 0;
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(`Профиль — ${user.tag}`)
                .setDescription(`> **Баланс:** 
            \`\`\`${userData.balance}\`\`\`
            > **Голосовой онлайн:**
            \`\`\`${Math.floor(userData.voice / 60)} ч. ${userData.voice % 60} мин.\`\`\`
            > **Голосовой онлайн за сегодня:**
            \`\`\`${Math.floor(userData.voiceToday / 60)} ч. ${userData.voiceToday % 60} мин.\`\`\``)
                .setColor(discord_js_1.Colors.DarkButNotBlack);
            yield interaction.reply({ embeds: [embed] });
        });
    }
};
