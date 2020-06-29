import { Client, MessageEmbed, TextBasedChannel } from "discord.js";

interface Submission {
    category?: string;
    time?: number;
    url?: string;
    name?: string;
}

export const sendSub = async (client: Client, sub: Submission, channelId: number): Promise<void> => {
    const embed = new MessageEmbed()
	.setTitle("We got a submission!")
	.setColor(0xff0000)
	.addField("**Category**", sub.category)
	.addField("**Time**", sub.time)
	.addField("**Evidence URL**", sub.url)
	.addField("**Name**", sub.name);
    const channel = client.channels.cache.get("535604615295533096");
    // @ts-ignore So sorry, discord.js sucks
    channel.send(embed);
}

export const sums: Record<string, Submission> = {};