import { Bot, matchPrefixes } from "@enitoni/gears";
import { Adapter, CommandGroup, Command } from "@enitoni/gears-discordjs";

const adapter = new Adapter({
    token: "NzI3MTY2NDcwNjY0MjI0ODM4.Xvn4lg.B8DUbaD0QhZYzvl4qCar1sZ3QcQ"
});

const command = new Command({
    matcher: matchPrefixes("test"),
    action: context => {
	const { message } = context;
	message.channel.send("Test received!");
    }
});

const group = new CommandGroup({
    matcher: matchPrefixes("!"),
    commands: [command]
});

const bot = new Bot({ adapter, group });
bot.start();
