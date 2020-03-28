import * as discord from 'discord.js';
import * as config from './config.json';
import { Bot } from './bot';
import { Message } from './message.interface';
import { Bank } from './bank';
import { Giphy } from './giphy';

const client = new discord.Client();
const bank = new Bank();
const giphy = new Giphy();

client.once('ready', () => {
    console.log('Bot running!');
});

client.on('message', async msg => {
    if (!msg.content.startsWith(config.prefix)) return;

    const bot: Bot = new Bot(bank, giphy);
    const behavior = bot.behaviors.find(b => msg.content.startsWith(b.trigger));
    if (msg.guild.me.nickname !== bot.name) { msg.guild.me.setNickname(bot.name) };

    if (behavior) {
        if (!behavior.activity) {
            const response = await behavior.action(msg);
            if (!response.image) { msg.channel.send(response.text) }
            else { msg.channel.send(response.text, { files: [response.image] }) };
        } else { client.user.setActivity(behavior.action(msg).text) };
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