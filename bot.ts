import { prefix } from './config.json';
import * as discord from 'discord.js';
import { Message } from './message.interface';

interface Behavior {
    name: string;
    trigger: string;
    action?: (msg: discord.Message | discord.PartialMessage) => Message;
}


export class Bot {
    public readonly botName: string = 'SaladTossBot';

    // Legit
    private coinTossed: Message = { text: `Here's a coin for you`, image: 'THCnhJPopHF2o9Cdeb' };
    public thereYouGo: Message = { text: `Let's see... ah, there you go!`, image: 'ZRMo8QM6M7lM4' };
    public totalCoins: Message = { text: `Present coin purses!` };
    public greeting: Message = { text: `Hello there!` };
    public resetCoins: Message = { text: `All coins tossed!` };
    public tossMe: Message = { text: `No thanks, my purse is already full!` };
    // Errors
    public noMember: Message = { text: `Huh?` };

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
        let response: Message = this.coinTossed;
        const member = msg.mentions.members.first();
        if (!member) return this.noMember;
        if (member.displayName == this.botName) return this.tossMe;
        response.text = `${response.text} ${member.displayName}!`;
        return response;
    }
}