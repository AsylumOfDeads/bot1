import { syncCommands } from "../deploy-commands";
import { Client } from "discord.js";

export = {
    name: "ready",
    once: true,
    async execute(client: Client) {
        console.log("Ready!");
        syncCommands();
    }
}