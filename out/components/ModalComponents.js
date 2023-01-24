"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedModal = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
function embedModal() {
    const titleInput = new builders_1.TextInputBuilder()
        .setLabel('Заголовок')
        .setCustomId('titleInput')
        .setPlaceholder('Текст')
        .setMinLength(1)
        .setMaxLength(256)
        .setRequired(true)
        .setStyle(discord_js_1.TextInputStyle.Short);
    const descriptionInput = new builders_1.TextInputBuilder()
        .setLabel('Описание')
        .setCustomId('descriptionInput')
        .setPlaceholder('Текст')
        .setMinLength(1)
        .setMaxLength(2048)
        .setRequired(false)
        .setStyle(discord_js_1.TextInputStyle.Paragraph);
    const colorInput = new builders_1.TextInputBuilder()
        .setLabel('Цвет в формате #RRGGBB')
        .setCustomId('colorInput')
        .setPlaceholder('#ffffff')
        .setMinLength(1)
        .setMaxLength(7)
        .setRequired(false)
        .setStyle(discord_js_1.TextInputStyle.Short);
    const urlInput = new builders_1.TextInputBuilder()
        .setLabel('Гиперссылка в заголовке')
        .setCustomId('urlInput')
        .setPlaceholder('https://')
        .setMinLength(1)
        .setMaxLength(2048)
        .setRequired(false)
        .setStyle(discord_js_1.TextInputStyle.Short);
    const imageInput = new builders_1.TextInputBuilder()
        .setLabel('Ссылка на изображение')
        .setCustomId('imageInput')
        .setPlaceholder('https://')
        .setMinLength(1)
        .setMaxLength(2048)
        .setRequired(false)
        .setStyle(discord_js_1.TextInputStyle.Short);
    const firstRow = new builders_1.ActionRowBuilder().addComponents(titleInput);
    const secondRow = new builders_1.ActionRowBuilder().addComponents(descriptionInput);
    const thirdRow = new builders_1.ActionRowBuilder().addComponents(colorInput);
    const fourthRow = new builders_1.ActionRowBuilder().addComponents(urlInput);
    const fifthRow = new builders_1.ActionRowBuilder().addComponents(imageInput);
    const modal = new builders_1.ModalBuilder()
        .setTitle('Создание Embed')
        .setCustomId('embedModal')
        .addComponents(firstRow, secondRow, thirdRow, fourthRow, fifthRow);
    return modal;
}
exports.embedModal = embedModal;
