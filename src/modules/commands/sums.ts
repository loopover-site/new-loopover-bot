import { Client, MessageEmbed, TextChannel } from "discord.js";

interface Submission {
    category?: string;
    time?: number;
    url?: string;
    name?: string;
}

export class SubmissionBuilder {
    constructor(
        private category: string,
        private time: number,
        private url: string,
        private name: string
    ) {}
    public send(client: Client) {
        sendSub(client, {
            category: this.category,
            time: this.time,
            url: this.url,
            name: this.name
        });
    }
}

export const sendSub = async (
    client: Client,
    sub: Submission
): Promise<void> => {
    const embed = new MessageEmbed()
        .setTitle("We got a submission!")
        .setColor(0xff0000)
        .setFooter("Bot made by ImperialWater")
        .setTimestamp(new Date())
        .addField("**Category**", sub.category, true)
        .addField("**Time**", sub.time, true)
        .addField("**Evidence URL**", sub.url)
        .addField("**Name**", sub.name);
    const channel = client.channels.cache.get(
        "535604615295533096"
    )! as TextChannel;
    channel.send(embed);
};

export const sums: Record<string, Submission> = {};
