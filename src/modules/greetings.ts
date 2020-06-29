import { GuildMember, TextChannel } from "discord.js";

const greetings: ((x: string) => string)[] = [
    x => `Welcome ${x}, to Loopworld!`,
    x => `Welcome to the loopzone, ${x}.`,
    x => `Welcome, ${x}, to the loopity scoop.`,
    x => `Welcome, ${x}, a new looper!`,
    x => `Welcome, ${x}, Mr. Looper.`,
    x => `Welcome to the loop, ${x}.`,
    x => `Welcome, ${x}, new loop recruit.`
];

export const handleNewMember = (member: GuildMember) => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const channel = member.guild.channels.cache.get('526598754791587852')! as TextChannel
    channel.send(randomGreeting(`<@${member.displayName}>`));
};
