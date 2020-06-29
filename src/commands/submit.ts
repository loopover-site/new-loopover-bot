import { matchPrefixes } from "@enitoni/gears";
import { Command } from "@enitoni/gears-discordjs";
import { sums } from "./sums";

const submit = new Command()
    .match(matchPrefixes("submit"))
    .use(ctx => {
	const { message } = ctx;
	sums[message.author!.id] = {};    
	message.delete();
	message.author!.send("What category would you like to submit for?");
    });

export { submit }
