"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCommands = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const rest_1 = require("@discordjs/rest");
const discord_js_1 = require("discord.js");
const config_json_1 = require("./json/config.json");
const commands = [];
const commandsPath = node_path_1.default.join(__dirname, 'commands');
const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath);
    commands.push((_a = command.data) === null || _a === void 0 ? void 0 : _a.toJSON());
}
const rest = new rest_1.REST({ version: '10' }).setToken(config_json_1.token);
function syncCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        rest.put(discord_js_1.Routes.applicationCommands(config_json_1.clientId), { body: commands })
            .then(() => console.log('- Commands Synced.'))
            .catch(console.error);
    });
}
exports.syncCommands = syncCommands;
