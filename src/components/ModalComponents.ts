import { ModalBuilder, TextInputBuilder, ActionRowBuilder } from "@discordjs/builders";
import { TextInputStyle } from "discord.js";

export function embedModal() {
    const titleInput = new TextInputBuilder()
        .setLabel('Заголовок')
        .setCustomId('titleInput')
        .setPlaceholder('Текст')
        .setMinLength(1)
        .setMaxLength(256)
        .setRequired(true)
        .setStyle(TextInputStyle.Short);
    const descriptionInput = new TextInputBuilder()
        .setLabel('Описание')
        .setCustomId('descriptionInput')
        .setPlaceholder('Текст')
        .setMinLength(1)
        .setMaxLength(2048)
        .setRequired(false)
        .setStyle(TextInputStyle.Paragraph);
    const colorInput = new TextInputBuilder()
        .setLabel('Цвет в формате #RRGGBB')
        .setCustomId('colorInput')
        .setPlaceholder('#ffffff')
        .setMinLength(1)
        .setMaxLength(7)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);
    const urlInput = new TextInputBuilder()
        .setLabel('Гиперссылка в заголовке')
        .setCustomId('urlInput')
        .setPlaceholder('https://')
        .setMinLength(1)
        .setMaxLength(2048)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);
    const imageInput = new TextInputBuilder()
        .setLabel('Ссылка на изображение')
        .setCustomId('imageInput')
        .setPlaceholder('https://')
        .setMinLength(1)
        .setMaxLength(2048)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);
    const secondRow = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput);
    const thirdRow = new ActionRowBuilder<TextInputBuilder>().addComponents(colorInput);
    const fourthRow = new ActionRowBuilder<TextInputBuilder>().addComponents(urlInput);
    const fifthRow = new ActionRowBuilder<TextInputBuilder>().addComponents(imageInput);

    const modal = new ModalBuilder()
        .setTitle('Создание Embed')
        .setCustomId('embedModal')
        .addComponents(firstRow, secondRow, thirdRow, fourthRow, fifthRow);
    
    return modal;
}