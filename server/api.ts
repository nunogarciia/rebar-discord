import {useRebar} from "@Server/index.js";
import {getClient} from "./bot.js";
import {DiscordConfig} from "./config.js";

const Rebar = useRebar();

export function useDiscord() {
    function client() {
        return getClient();
    }

    function getConfig() {
        return DiscordConfig;
    }

    return {
        client,
        getConfig
    }
}


declare global {
    export interface ServerPlugin {
        ['discord-api']: ReturnType<typeof useDiscord>;
    }
}

Rebar.useApi().register('discord-api', useDiscord());