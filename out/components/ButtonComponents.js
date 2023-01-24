"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshButton = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
function refreshButton(subject) {
    return new builders_1.ActionRowBuilder()
        .addComponents(new builders_1.ButtonBuilder()
        .setCustomId(`refresh${subject}Button`)
        .setLabel('Обновить')
        .setStyle(discord_js_1.ButtonStyle.Primary));
}
exports.refreshButton = refreshButton;
