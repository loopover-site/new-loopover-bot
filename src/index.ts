import { matchPrefixes } from "@enitoni/gears";
import { Bot, Adapter, CommandGroup, Command } from "@enitoni/gears-discordjs";
import { DMChannel } from "discord.js";
import { handleNewMember } from "./modules/greetings";
import { submit } from "./modules/commands/submit";
import { sums, sendSub } from "./modules/commands/sums";

const adapter = new Adapter({
    token: process.env.BOT_TOKEN!
});

const command = new Command()
    .match(matchPrefixes("test"))
    .use(context => {
	const { message } = context;
	message.channel.send(`Test received!`);
    });

const group = new CommandGroup()
    .match(matchPrefixes("!"))
    .setCommands(command, submit);

const bot = new Bot({ adapter, commands: [group] });

bot.client.on("guildMemberAdd", member => {
    if (!member.partial) {
        handleNewMember(member);
    }
});

bot.client.on("message", message => {
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
	    sendSub(bot.client, sub, 535604615295533096);
	    message.channel.send("Your entry was submitted! A moderator will process your request shortly.");
	} else if (sub.time) {
	    const attachment = message.attachments?.first()?.url;
	    sub.url = attachment ? attachment : message.content
	    message.channel.send(`What name would you like to use?`);
	} else if (sub.category) {
	    if (Number(message.content).toString() === message.content) {
	        sub.time = +message.content;
	        message.channel.send(`What is the URL of your evidence?`);
	    } else {
	        message.channel.send(`That is not a number! What time did you get?`);
	    }
	} else {
	    sub.category = message.content;
	    message.channel.send(`What time did you get?`);
	}
});

const main = async () => {
    await bot.start();
    console.log("Bot started!");
}

main();
