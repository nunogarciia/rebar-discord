import * as alt from "alt-server";
import { ColorResolvable, EmbedBuilder, ActivityType } from "discord.js";
import {client} from "./client.js";
import { DiscordConfig } from "../shared/config.js";
import { useConfig } from "@Server/config/index.js";
import Embed from "./events/embed.js";
import { useTranslate } from "@Shared/translate.js";

import '../translate/index.js';

const config = useConfig();
let botStateIndex: number = -1;

const { t } = useTranslate('pt');

export async function init() {
    if ( !config.get().discord_token || config.get().discord_token.length === 0 ) {
        alt.logError("Bot token is empty");
    }

    client.on('ready', () => {
        if (alt.getServerConfig().debug)
            alt.log('[DISCORD]', `Logged in as ${client.user.tag}!`);

        client.user.setActivity({
            name: 'MetaRP',
            state: "A repor serviços",
            url: DiscordConfig.BOT_WEBSITE_URL,
            type: ActivityType.Watching
        });
    });

    client.login(config.get().discord_token);
    alt.setInterval(changeStates, 10000);

    const embed = Embed().create(t('dc.systems.loading'), t('dc.systems.title'), 'Orange', { text: t('dc.version') })
    await sendMessage(embed, DiscordConfig.CHANNELS.status, DiscordConfig.MESSAGES_IDS.status)
}

export function getClient() {
    return client;
}

export async function sendMessage(embed: EmbedBuilder, channelId: string, messageId?: string) {
    try {
        let guild = client.guilds.cache.get(DiscordConfig.SERVER_ID);
        if (!guild) {
            guild = await client.guilds.fetch(DiscordConfig.SERVER_ID);
            if (!guild) {
                alt.logError('[DISCORD]', `Guild '${DiscordConfig.SERVER_ID}' not found.`);
                return null;
            }
        }

        let channel = await guild.channels.cache.get(channelId);
        if (!channel) {
            channel = await guild.channels.fetch(channelId);
            if (!channel) {
                alt.logError('[DISCORD]', `Channel '${channelId}' not found.`);
                return null;
            }
        }

        if (messageId) {
            try {
                let msg = await channel.messages.cache.get(messageId);
                if (!msg) {
                    msg = await channel.messages.fetch(messageId);
                }
                if (msg) {
                    return await msg.edit({ embeds: [embed] });
                } else {
                    throw new Error('Message not found');
                }
            } catch (error) {
                alt.logError('[DISCORD]', `Message ID '${messageId}' not found. Sending a new message.`);
                const msgSent = await channel.send({ embeds: [embed] });
                alt.logError('[DISCORD]', `New Message ID: '${msgSent.id}', change it on you config.`);
                return msgSent;
            }
        } else {
            const msgSent = await channel.send({ embeds: [embed] });
            return msgSent;
        }
    } catch (error) {
        alt.logError('[DISCORD]', `Failed to send/edit message: ${error.message}`);
        return null;
    }
}

function changeStates() {
    if ( !client ) return;

    const onlinePlayersCount = alt.Player.all.length;
    const vehiclesCount = alt.Vehicle.all.length;

    botStateIndex ++;
    if ( botStateIndex >= DiscordConfig.BOT_STATES.length )
        botStateIndex = 0;

    let message = DiscordConfig.BOT_STATES.at(botStateIndex);
    if ( !message ) {
        botStateIndex = 0;
        return;
    }

    const maxPlayers = alt.getServerConfig().players;
    message = message.replaceAll("_player_count_", onlinePlayersCount.toString());
    message = message.replaceAll("_vehicle_count_", vehiclesCount.toString());
    message = message.replaceAll("_server_player_max_", maxPlayers.toString());

    client.user.setActivity({
        name: 'MetaRP',
        state: message,
        url: DiscordConfig.BOT_WEBSITE_URL,
        type: ActivityType.Playing
    });
}