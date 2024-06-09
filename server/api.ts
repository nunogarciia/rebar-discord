import { ColorResolvable } from "discord.js";
import {useRebar} from "@Server/index.js";
import {getClient, sendMessage } from "./bot.js";
import Embed from "./events/embed.js";
import {registerCommand} from "./client.js";
import { DiscordConfig } from "../shared/config.js";
import Translations from '../translate/index.js';

const Rebar = useRebar();

export function useDiscord() {
    function client() {
        return getClient();
    }

    function getConfig() {
        return DiscordConfig;
    }

    function getTranslations() {
        return Translations;
    }

    async function sendEmbed(channelId: string, description: string, title?: string, color?: ColorResolvable, footer?: { text: string }, messageId?: string) {
        const embed = Embed().create(description, title, color, footer);
        await sendMessage(embed, channelId, messageId)
    }

    return {
        client,
        getConfig,
        registerCommand,
        sendEmbed,
        getTranslations
    }
}

declare global {
    export interface ServerPlugin {
        ['discord-bot']: ReturnType<typeof useDiscord>;
    }
}

Rebar.useApi().register('discord-bot', useDiscord());