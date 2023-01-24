"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uptimeEmbed = exports.pingEmbed = exports.successEmbed = exports.errorEmbed = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
function errorEmbed(message, error) {
    return { embeds: [
            new builders_1.EmbedBuilder()
                .setTitle('Ошибка!')
                .setDescription(error ? (0, builders_1.bold)(`${message}: ${error}`) : (0, builders_1.bold)(message))
                .setColor(discord_js_1.Colors.Red)
                .setTimestamp()
        ], ephemeral: true };
}
exports.errorEmbed = errorEmbed;
function successEmbed(message) {
    return { embeds: [
            new builders_1.EmbedBuilder()
                .setTitle('Успех!')
                .setDescription((0, builders_1.bold)(message))
                .setColor(discord_js_1.Colors.Green)
                .setTimestamp()
        ], ephemeral: true };
}
exports.successEmbed = successEmbed;
function pingEmbed(client) {
    return new builders_1.EmbedBuilder()
        .setTitle(`Пинг бота: ${client.ws.ping} миллисекунд`)
        .setColor(discord_js_1.Colors.Green);
}
exports.pingEmbed = pingEmbed;
function uptimeEmbed(interaction) {
    return new builders_1.EmbedBuilder()
        .setTitle(`**Бот работает ${Math.floor(interaction.client.uptime / 1000 / 60 / 60)} часов ${Math.floor(interaction.client.uptime / 1000 / 60 % 60)} минут ${Math.floor(interaction.client.uptime / 1000 % 60)} секунд**`)
        .setColor(discord_js_1.Colors.Green);
}
exports.uptimeEmbed = uptimeEmbed;
