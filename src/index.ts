import { matchPrefixes } from "@enitoni/gears";
import { Bot, Adapter, CommandGroup, Command } from "@enitoni/gears-discordjs";

const adapter = new Adapter({
    token: process.env.BOT_TOKEN!
});

const command = new Command()
    .match(matchPrefixes("test"))
    .use(context => {
	const { message } = context;
	message.channel.send("Test received!");
    });

const group = new CommandGroup()
    .match(matchPrefixes("!"))
    .setCommands(command);

const bot = new Bot({ adapter, commands: [group] });

const main = async () => {
    await bot.start();
    console.log("Bot started!");
}

main();
