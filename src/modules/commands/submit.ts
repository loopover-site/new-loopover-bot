import { matchPrefixes } from "@enitoni/gears";
import { Command } from "@enitoni/gears-discordjs";
import { sums } from "./sums";

const submit = new Command()
    .match(matchPrefixes("submit"))
    .use(ctx => {
	const { message } = ctx;
	if (message.channel.id !== "535613677139787777") {
	    message.delete();
	    message.channel.send("Please perform all submissions in <#535613677139787777>.");
	    return;
	}
	sums[message.author!.id] = {};    
	message.delete();
	message.author!.send("What category would you like to submit for?");
    });

export { submit }
