import {useRebar} from "@Server/index.js";
import {getClient} from "./bot.js";

const Rebar = useRebar();

export function useDiscord() {
    function client() {
        return getClient();
    }

    return {
        client
    }
}


declare global {
    export interface ServerPlugin {
        ['discord-api']: ReturnType<typeof useDiscord>;
    }
}

Rebar.useApi().register('discord-api', useDiscord());