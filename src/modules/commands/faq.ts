import { matchPrefixes } from "@enitoni/gears";
import { Command } from "@enitoni/gears-discordjs";
import { MessageEmbed } from "discord.js";

const resourcesEmbed = new MessageEmbed()
    .setTitle("**Loopover FAQ**")
    .setDescription(
        "Here is a list of the frequently asked questions for Loopover."
    )
    .setColor(0xffff00)
    .addField(
        "**Are there leaderboards?**",
        "[The leaderboards show all the rankings for many categories.](https://docs.google.com/spreadsheets/d/16_r9a59ybKLbNmW1j88USwDS82bLHeUBFy3ifOO-KEk/edit)"
    )
    .addField(
        "**What's the best method?**",
        "The current best method is a modified version of CaryKH's method. You solve ABCD, FGHI, KLMN, PQRS, and finally EJO and LSLL."
    )
    .addField(
        "**What's the best platform to play on?**",
        "Mobile. It's simply so much faster than all the other methods."
    )
    .addField(
        "**What site should I use?**",
        "[This one, made by Janis.](https://loopover.xyz)"
    );

export const faq = new Command().match(matchPrefixes("faq")).use((ctx) => {
    const { message } = ctx;
    message.channel.send(resourcesEmbed);
});
