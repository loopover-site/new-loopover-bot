import { matchPrefixes } from "@enitoni/gears";
import { Command } from "@enitoni/gears-discordjs";
import { sums, SubmissionBuilder } from "./sums";
import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";

const submit = new Command()
    .match(matchPrefixes("submit"))
    .use<ParseArgumentsState>((ctx) => {
        const { message } = ctx;
        const { args } = ctx.state;
        // if (message.channel.id !== "535613677139787777") {
        //     message.delete();
        //     message.channel.send(
        //         "Please perform all submissions in <#535613677139787777>."
        //     );
        //     return;
        // }
        if (message.attachments?.first() && args.length >= 3) {
            const category = args.shift();
            const time = args.shift();
            const url = message.attachments?.first()?.url;
            const name = args.reduce((acc, cur) => acc + " " + cur);
            new SubmissionBuilder(
                category!,
                time!,
                url!,
                name!,
                message.author.username
            ).send(message.client);
            message.delete();
            message.channel.send(
                "Your entry was submitted! A moderator will process your request shortly."
            );
            return;
        }
        if (args.length >= 4) {
            const category = args.shift();
            const time = args.shift();
            const url = args.shift();
            const name = args.reduce((acc, cur) => acc + " " + cur);
            new SubmissionBuilder(
                category!,
                time!,
                url!,
                name!,
                message.author.username
            ).send(message.client);
            message.delete();
            message.channel.send(
                "Your entry was submitted! A moderator will process your request shortly."
            );
            return;
        }
        sums[message.author!.id] = {};
        message.delete();
        message.author!.send("What category would you like to submit for?");
    });

export { submit };
