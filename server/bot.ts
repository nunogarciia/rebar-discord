import {Client, GatewayIntentBits} from "discord.js";
import alt from "alt-server";
import {DiscordConfig} from "./config.js";

let botStateIndex: number = -1;
let client: Client = undefined;

export function init() {
    if ( !DiscordConfig.BOT_TOKEN || DiscordConfig.BOT_TOKEN.length === 0 ) {
        alt.logError("Bot token is empty");
    }

    client = new Client({ intents: DiscordConfig.INTENTS });

    client.on('ready', () => {
        alt.log('[DISCORD-AUTH]', `Logged in as ${client.user.tag}!`);

        client.user.setActivity({
            name: 'alt:V',
            state: "server bootup",
            url: DiscordConfig.BOT_WEBSITE_URL,
            type: 0
        });
    });

    client.login(DiscordConfig.BOT_TOKEN);
    alt.setInterval(changeStates, 10000);
}

export function getClient() {
    return client;
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

    message = message.replaceAll("_player_count_", onlinePlayersCount.toString());
    message = message.replaceAll("_vehicle_count_", vehiclesCount.toString());

    client.user.setActivity({
        name: 'alt:V',
        state: message,
        url: DiscordConfig.BOT_WEBSITE_URL,
        type: 2
    });
}