import { matchPrefixes } from "@enitoni/gears";
import { Bot, Adapter, CommandGroup, Command } from "@enitoni/gears-discordjs";
import { DMChannel } from "discord.js";
import { handleNewMember } from "./modules/greetings";
import { submit } from "./modules/commands/submit";
import { faq } from "./modules/commands/faq";
import { help } from "./modules/commands/help";
import { mps } from "./modules/commands/mps";
import { sums, sendSub } from "./modules/commands/sums";
import { parseArguments } from "./common/parsing/middleware/parseArguments";

const adapter = new Adapter({
    token: process.env.BOT_TOKEN!
});

const command = new Command().match(matchPrefixes("test")).use((context) => {
    const { message } = context;
    message.channel.send(`Test received!`);
});

const group = new CommandGroup()
    .match(matchPrefixes("!"))
    .use(parseArguments)
    .setCommands(command, submit, mps, help, faq);

export const bot = new Bot({ adapter, commands: [group] });

bot.client.on("guildMemberAdd", (member) => {
    if (!member.partial) {
        handleNewMember(member);
    }
});

bot.client.on("message", (message) => {
    if (message.author.bot) {
        return;
    }
    const id = message.author!.id;
    if (!id) return;
    if (!(message.channel instanceof DMChannel)) return;
    const sub = sums[id];
    if (!sub) return;
    if (sub.url) {
        sub.name = message.content;
        sub.rawName = message.author.username;
        sendSub(bot.client, sub);
        message.channel.send(
            "Your entry was submitted! A moderator will process your request shortly."
        );
    } else if (sub.time) {
        const attachment = message.attachments?.first()?.url;
        sub.url = attachment ? attachment : message.content;
        message.channel.send(`What name would you like to use?`);
    } else if (sub.category) {
        sub.time = message.content;
        message.channel.send(`What is the URL of your evidence?`);
    } else {
        sub.category = message.content;
        message.channel.send(`What time did you get?`);
    }
});

const main = async () => {
    await bot.start();
    bot.client.user!.setActivity("Loopover!");
    console.log("Bot started!");
};

main();
