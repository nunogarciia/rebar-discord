# Discord.js integration for Rebar Framework

this plugin allows you to use Discord.JS feature as a Rebar plugin API.

visit [Discord.JS](https://discord.js.org/) how you use Discord.JS.

## Requires
- [Rebar Framework](https://github.com/Stuyk/rebar-altv)

## Features
- Creating easy Slash commands

## API

you can use this api by getting the current client from Discord.JS with `discord-api`

```ts
import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { getUserGuildMember } from "./requests";
import { Interaction } from "discord.js";

const Rebar = useRebar();

let client: Client = undefined; // we define to use client everywhere in our code.

async function init() {
    // Get the API and current discord client
    const discord = await api.getAsync('discord-api');
    client = discordAPI.client();
    discord.registerCommand({
        name: 'ping', 
        description: 'shows a pong message', 
        callback: commandTest
    })

    const guildMember = await getUserGuildMember('32130919230193013');
}

// this is just a example how to use the API.
// get user member from server_id by given userId
async function getUserGuildMember(userId: string) {
    if (!client) return undefined;

    const guild = await client.guilds.fetch(DiscordAuthConfig.SERVER_ID);
    if (!guild) return undefined;

    return guild.members.fetch(userId);
}

//example slash command callback
async function commandTest(interaction: Interaction) {
    interaction.reply("ping");
}
// more examples under server/commands/index.ts


init(); // call init function on server plugin startup.
```

## Installation

From the main directory of your `Rebar` Framework.

```
git clone https://github.com/unfloned/rebar-discord.git src/plugins/discord
```

and check `server/config.ts` and add your discord bot token into `BOT_TOKEN` 


That's all.

if you wish to save the plugin in your own repository, go to `src/plugins/discord` folder and delete the `.git` folder.