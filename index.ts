import * as discord from 'discord.js';
import * as config from './config.json';

const client = new discord.Client();

client.once('ready', () => {
    console.log('Bot running!');
})

client.on('message', msg => {
    if (msg.content.startsWith(`${config.prefix}toss`)) {
        const member = msg.mentions.members.first();
        msg.channel.send(`Hey ${member.displayName}! Here's a coin!`);
    }
})
client.login(config.token);