import { matchPrefixes } from "@enitoni/gears";
import { Command } from "@enitoni/gears-discordjs";
import { MessageEmbed } from "discord.js";

const helpEmbed = new MessageEmbed()
    .setTitle("**Welcome to Loopover!**")
    .setDescription(
        "This bot is the discord bot for the Loopover discord server."
    )
    .setColor(0xffff00)
    .addField(
        "**!help**",
        "This command shows you the help menu, but you probably knew that already."
    )
    .addField(
        "**!submit**",
        "Submit a time to the leaderboard! Use it without any arguments to get the submission helper, or you can use it with the advanced syntax for a faster submission."
    )
    .addField(
        "**!mps**",
        "Calculate the MPS of your solve! Not sure why you need this because the site already shows your mps. Syntax is !mps [moves] [seconds] <optional truncation amount>. The truncation amount defaults to 2, but you can provide a custom value."
    );

export const help = new Command().match(matchPrefixes("help")).use((ctx) => {
    const { message } = ctx;
    message.channel.send(helpEmbed);
});
