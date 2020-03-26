import * as discord from 'discord.js';
import * as config from './config.json';
import { Bot } from './bot';

const client = new discord.Client();
const coinTossMsg: string = `Here's a coin for you `;

client.once('ready', () => {
    console.log('Bot running!');
})

client.on('message', msg => {
    if (!msg.content.startsWith(config.prefix)) return;

    const bot: Bot = new Bot();
    const behavior = bot.behaviors.find(b => msg.content.startsWith(b.trigger));

    if (behavior) {
        const response = behavior.action(msg);
        msg.channel.send(response.text);
    }
    // if (msg.content.startsWith(`${config.prefix}toss`)) {
    //     const member = msg.mentions.members.first();
    //     giphy.gifById('THCnhJPopHF2o9Cdeb').then(gifRes => {
    //         const gif = gifRes.data[0];
    //         msg.channel.send(finalMsg, { files: [gif] });
    //     }).catch(err => msg.channel.send(finalMsg))
    // }
})
client.login(config.token);