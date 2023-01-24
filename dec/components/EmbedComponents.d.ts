import { EmbedBuilder } from "@discordjs/builders";
import { ButtonInteraction, ChatInputCommandInteraction, Client, InteractionReplyOptions } from "discord.js";
export declare function errorEmbed(message: string, error?: string): InteractionReplyOptions;
export declare function successEmbed(message: string): InteractionReplyOptions;
export declare function pingEmbed(client: Client): EmbedBuilder;
export declare function uptimeEmbed(interaction: ButtonInteraction | ChatInputCommandInteraction): EmbedBuilder;
