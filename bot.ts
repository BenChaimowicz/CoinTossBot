import { prefix } from './config.json';
import * as discord from 'discord.js';


interface Message {
    text: string;
    image?: string;
}

interface Behavior {
    name: string;
    trigger: string;
    action?: (msg: discord.Message | discord.PartialMessage) => Message;
}


export class Bot {

    private coinTossed: Message = { text: `Here's a coin for you`, image: 'THCnhJPopHF2o9Cdeb' };
    public thereYouGo: Message = { text: `Let's see... ah, there you go!`, image: 'ZRMo8QM6M7lM4' };
    public totalCoins: Message = { text: `Present coin purses!` };
    public greeting: Message = { text: `Hello there!` };
    public resetCoins: Message = { text: `All coins tossed!` };

    public behaviors: Behavior[];

    constructor() {
        this.behaviors = [
            { name: 'CoinTossed', trigger: prefix + 'toss', action: this.tossCoin },
            { name: 'NikiHorse', trigger: prefix + 'showniki' },
            { name: 'Total', trigger: prefix + 'total' },
            { name: 'Greet', trigger: prefix + 'hello' },
            { name: 'Reset', trigger: prefix + 'reset' },
        ]
    }

    tossCoin = (msg: discord.Message | discord.PartialMessage) => {
        const member = msg.mentions.members.first();
        let response: Message = this.coinTossed;
        response.text = `${response.text} ${member.displayName}!`;
        return response;
    }
}