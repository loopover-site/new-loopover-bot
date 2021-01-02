import { Client, MessageEmbed, TextChannel } from "discord.js";

interface Submission {
    category?: string;
    time?: string;
    url?: string;
    name?: string;
    rawName?: string;
}

export class SubmissionBuilder {
    constructor(
        private category: string,
        private time: string,
        private url: string,
        private name: string,
        private rawName: string
    ) {}
    public send(client: Client) {
        sendSub(client, {
            category: this.category,
            time: this.time,
            url: this.url,
            name: this.name,
            rawName: this.rawName
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
        .addField("**Name**", sub.name, true)
        .addField("**User**", sub.rawName, true);
    const channel = client.channels.cache.get(
        "535604615295533096"
    )! as TextChannel;
    channel.send(embed);
};

export const sums: Record<string, Submission> = {};
