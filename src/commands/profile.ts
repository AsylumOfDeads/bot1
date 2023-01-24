import { ChatInputCommandInteraction, Colors, EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import { errorEmbed } from "../components/EmbedComponents";
import { Data } from "../mongoose";

export = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Показывает профиль пользователя")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Пользователь")
                .setRequired(false)),
    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.member;
        const userData = await Data.Users.get(user.id);
        const userStatus = (member as GuildMember).presence?.status;
        if (!userData) return await interaction.reply(errorEmbed("Пользователь не найден"));
        const daysPassed = Math.floor(Date.now() / 86400000);
        userData.voiceToday = userData.voiceLastDay === daysPassed ? userData.voiceToday : 0;
        const embed = new EmbedBuilder()
            .setTitle(`Профиль — ${user.tag}`)
            .setDescription(`> **Баланс:** 
            \`\`\`${userData.balance}\`\`\`
            > **Голосовой онлайн:**
            \`\`\`${Math.floor(userData.voice / 60)} ч. ${userData.voice % 60} мин.\`\`\`
            > **Голосовой онлайн за сегодня:**
            \`\`\`${Math.floor(userData.voiceToday / 60)} ч. ${userData.voiceToday % 60} мин.\`\`\``)
            .setColor(Colors.DarkButNotBlack)
        await interaction.reply({ embeds: [embed] });
    }
}