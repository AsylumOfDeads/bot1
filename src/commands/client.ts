import { bold, ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { refreshButton } from "../components/ButtonComponents";
import { pingEmbed, uptimeEmbed } from "../components/EmbedComponents";
import { embedModal } from "../components/ModalComponents";

export = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Управление ботом")
        .addSubcommand(subcommand =>
            subcommand
                .setName("ping")
                .setDescription("Пинг бота"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("say")
                .setDescription("Сказать что-то")
                .addStringOption(option =>
                    option
                        .setName("text")
                        .setDescription("Текст")
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("uptime")
                .setDescription("Время работы бота"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("embed")
                .setDescription("Отправить embed"))
        .setDefaultMemberPermissions(1),
    async execute(interaction: ChatInputCommandInteraction) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "ping":
                await interaction.reply({ embeds: [pingEmbed(interaction.client)], components: [refreshButton("Ping")] });
                interaction.client.interactions.set("refreshPingButton", (interaction: ButtonInteraction) => {
                    interaction.update({ embeds: [pingEmbed(interaction.client)] });
                })
                break;
            case "say":
                const text = interaction.options.getString("text");
                await interaction.channel.send({ content: text });
                await interaction.reply({ content: bold("Сообщение отправлено"), ephemeral: true });
                break;
            case "uptime":
                await interaction.reply({ embeds: [uptimeEmbed(interaction)], components: [refreshButton("Uptime")] });
                interaction.client.interactions.set("refreshUptimeButton", (interaction: ButtonInteraction) => {
                    interaction.update({ embeds: [uptimeEmbed(interaction)] });
                })
                break;
            case "embed":
                await interaction.showModal(embedModal());
                interaction.client.interactions.set("embedModal", (interaction: ModalSubmitInteraction) => {
                    const title = interaction.fields.getTextInputValue("titleInput");
                    const description = interaction.fields.getTextInputValue("descriptionInput");
                    const color = interaction.fields.getTextInputValue("colorInput");
                    const url = interaction.fields.getTextInputValue("urlInput");
                    const image = interaction.fields.getTextInputValue("imageInput");
                    const colorHex = color ? parseInt('0x' + color.replace("#", ""), 16) : 0x2f3136;
                    try {
                        const embed = new EmbedBuilder()
                            .setTitle(title)
                            .setColor(colorHex)

                        description ? embed.setDescription(description) : null;
                        url ? embed.setURL(url) : null;
                        image ? embed.setImage(image) : null;
                        interaction.channel.send({ embeds: [embed] });
                    } catch (error) {
                        interaction.channel.send("Ошибка при отправке embed-а");
                        console.log(error);
                    }
                    interaction.reply({ content: "**Embed отправлен!**", ephemeral: true });
                })
                break;
        }
    }
}