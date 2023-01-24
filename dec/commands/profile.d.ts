import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
declare const _default: {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute(interaction: ChatInputCommandInteraction): Promise<import("discord.js").InteractionResponse<boolean>>;
};
export = _default;
