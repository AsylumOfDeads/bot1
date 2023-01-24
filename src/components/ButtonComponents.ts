import { ButtonBuilder, ActionRowBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export function refreshButton(subject: string) {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`refresh${subject}Button`)
                .setLabel('Обновить')
                .setStyle(ButtonStyle.Primary)
        );
}