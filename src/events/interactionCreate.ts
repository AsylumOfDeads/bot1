import { Interaction, InteractionType } from "discord.js";

export = {
    name: "interactionCreate",
    async execute(interaction: Interaction) {
        if(interaction.type === InteractionType.ApplicationCommand) {
            const command = interaction.client.commands.get(interaction.commandName);
            if(!command) return;
            await command.execute(interaction);
            return;
        }
        if(interaction.type !== InteractionType.ApplicationCommandAutocomplete) {
            const interactions = interaction.client.interactions;
            if(!interactions.has(interaction.customId)) return;
            await interactions.get(interaction.customId)(interaction);
        } 
    }
}