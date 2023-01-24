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
const builders_1 = require("@discordjs/builders");
const ButtonComponents_1 = require("../components/ButtonComponents");
const EmbedComponents_1 = require("../components/EmbedComponents");
const ModalComponents_1 = require("../components/ModalComponents");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName("bot")
        .setDescription("Управление ботом")
        .addSubcommand(subcommand => subcommand
        .setName("ping")
        .setDescription("Пинг бота"))
        .addSubcommand(subcommand => subcommand
        .setName("say")
        .setDescription("Сказать что-то")
        .addStringOption(option => option
        .setName("text")
        .setDescription("Текст")
        .setRequired(true)))
        .addSubcommand(subcommand => subcommand
        .setName("uptime")
        .setDescription("Время работы бота"))
        .addSubcommand(subcommand => subcommand
        .setName("embed")
        .setDescription("Отправить embed"))
        .setDefaultMemberPermissions(1),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcommand = interaction.options.getSubcommand();
            switch (subcommand) {
                case "ping":
                    yield interaction.reply({ embeds: [(0, EmbedComponents_1.pingEmbed)(interaction.client)], components: [(0, ButtonComponents_1.refreshButton)("Ping")] });
                    interaction.client.interactions.set("refreshPingButton", (interaction) => {
                        interaction.update({ embeds: [(0, EmbedComponents_1.pingEmbed)(interaction.client)] });
                    });
                    break;
                case "say":
                    const text = interaction.options.getString("text");
                    yield interaction.channel.send({ content: text });
                    yield interaction.reply({ content: (0, discord_js_1.bold)("Сообщение отправлено"), ephemeral: true });
                    break;
                case "uptime":
                    yield interaction.reply({ embeds: [(0, EmbedComponents_1.uptimeEmbed)(interaction)], components: [(0, ButtonComponents_1.refreshButton)("Uptime")] });
                    interaction.client.interactions.set("refreshUptimeButton", (interaction) => {
                        interaction.update({ embeds: [(0, EmbedComponents_1.uptimeEmbed)(interaction)] });
                    });
                    break;
                case "embed":
                    yield interaction.showModal((0, ModalComponents_1.embedModal)());
                    interaction.client.interactions.set("embedModal", (interaction) => {
                        const title = interaction.fields.getTextInputValue("titleInput");
                        const description = interaction.fields.getTextInputValue("descriptionInput");
                        const color = interaction.fields.getTextInputValue("colorInput");
                        const url = interaction.fields.getTextInputValue("urlInput");
                        const image = interaction.fields.getTextInputValue("imageInput");
                        const colorHex = color ? parseInt('0x' + color.replace("#", ""), 16) : 0x2f3136;
                        try {
                            const embed = new discord_js_1.EmbedBuilder()
                                .setTitle(title)
                                .setColor(colorHex);
                            description ? embed.setDescription(description) : null;
                            url ? embed.setURL(url) : null;
                            image ? embed.setImage(image) : null;
                            interaction.channel.send({ embeds: [embed] });
                        }
                        catch (error) {
                            interaction.channel.send("Ошибка при отправке embed-а");
                            console.log(error);
                        }
                        interaction.reply({ content: "**Embed отправлен!**", ephemeral: true });
                    });
                    break;
            }
        });
    }
};
