"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("./json/config.json");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildVoiceStates] });
exports.client.on('warn', console.warn);
exports.client.on('debug', console.log);
exports.client.commands = new discord_js_1.Collection();
exports.client.interactions = new discord_js_1.Collection();
exports.client.extras = new discord_js_1.Collection();
const eventsPath = path_1.default.join(__dirname, 'events');
const eventFiles = fs_1.default.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const commandsPath = path_1.default.join(__dirname, 'commands');
const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    exports.client.commands.set((_a = command.data) === null || _a === void 0 ? void 0 : _a.name, command);
}
for (const file of eventFiles) {
    const filePath = path_1.default.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        exports.client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        exports.client.on(event.name, (...args) => event.execute(...args));
    }
}
exports.client.login(config_json_1.token);
