import { ColorResolvable, EmbedBuilder } from "discord.js";

export default () => {
    function create(description: string, title?: string, color?: ColorResolvable, footer?: { text: string}) {
        if (!color)
            color = 'Blurple';

        const embed = new EmbedBuilder()
        .setColor(color);

        if (title)
            embed.setTitle(title);

        if (description)
        embed.setDescription(description)

        if (footer)
            embed.setFooter(footer)

        return embed
    }

    return { create }
}