import { matchPrefixes } from "@enitoni/gears";
import { Command } from "@enitoni/gears-discordjs";
import { ParseArgumentsState } from "../../common/parsing/middleware/parseArguments";

const isNumber = (n: unknown): n is number => Number(n).toString() === n;

export const mps = new Command()
    .match(matchPrefixes("mps"))
    .use<ParseArgumentsState>((ctx) => {
        const { message } = ctx;
        const { args } = ctx.state;
        if (args.length < 2) {
            return message.channel.send("You need to provide 2 arguments!");
        }
        if (!isNumber(args[0])) {
            return message.channel.send("The first argument isn't a number!");
        }
        if (!isNumber(args[1])) {
            return message.channel.send("The second argument isn't a number!");
        }
        message.channel.send(
            `Your mps is ${(Number(args[0]) - 1) / Number(args[1])}!`
        );
    });
