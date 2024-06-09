import {GatewayIntentBits} from "discord.js";

export const DiscordConfig = {
    SERVER_ID: "",
    CLIENT_ID: "",
    BOT_STATES: [
        "[_player_count_/250] players connected",
        "_vehicle_count_ vehicles spawned",
        "sooo funny"
    ],
    INTENTS: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessagePolls,
    ],
    CHANNELS: {
        status: '',
        logs: '',
        tests: ''
    },
    MESSAGES_IDS: {
        logs: '',
    },
    BOT_WEBSITE_URL: '',
    DISABLE_DEFAULT_COMMANDS: true
}