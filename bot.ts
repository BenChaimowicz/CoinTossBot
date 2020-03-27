import { prefix } from './config.json';
import * as discord from 'discord.js';
import { Message } from './message.interface';
import { Bank } from './bank';

interface Behavior {
    name: string;
    trigger: string;
    action?: (msg: discord.Message | discord.PartialMessage) => Message;
    activity?: boolean;
}


export class Bot {
    private readonly _botName: string = 'CoinTossBot';
    private bank: Bank;

    // Legit
    private coinTossed: Message = { text: `Here's a coin for you`, image: 'THCnhJPopHF2o9Cdeb' };
    public thereYouGo: Message = { text: `Let's see... ah, there you go!`, image: 'ZRMo8QM6M7lM4' };
    public totalCoins: Message = { text: `Present coin purses!` };
    public greeting: Message = { text: `Hello there!` };
    public resetCoins: Message = { text: `All coins tossed!` };
    public tossMe: Message = { text: `No tossing at me, my purse is already full!` };
    // Errors
    public noMember: Message = { text: `Huh?` };
    // Activities
    private activityToss: Message = { text: `Tossing coins` };

    public behaviors: Behavior[];

    constructor(bank: Bank) {
        this.initBehaviors();
        this.bank = bank;
    }

    get name(): string { return this._botName };

    private initBehaviors = () => {
        this.behaviors = [
            { name: 'CoinTossed', trigger: prefix + 'toss', action: this.tossCoin },
            { name: 'NikiHorse', trigger: prefix + 'showniki' },
            { name: 'Total', trigger: prefix + 'total', action: this.showTotal },
            { name: 'Greet', trigger: prefix + 'hello' },
            { name: 'Reset', trigger: prefix + 'reset' },
            { name: 'TossAtActivity', trigger: prefix + 'dontstoptossingat', action: this.tossAtActivity, activity: true },
        ]
    }
    private generateMentionForMember = (member: discord.GuildMember): string => {
        return `<@${member.user.id}>`
    }
    // Activity
    tossAtActivity = (msg: discord.Message | discord.PartialMessage) => {
        const member = msg.mentions.members.first();
        if (!member) return this.activityToss;
        return { ...this.activityToss, text: `${this.activityToss} at ${member.displayName}` };
    }

    greet = (msg: discord.Message | discord.PartialMessage) => {
        return this.greeting;
    }

    tossCoin = (msg: discord.Message | discord.PartialMessage) => {
        let response: Message = this.coinTossed;
        const member = msg.mentions.members.first();
        if (!member) return this.noMember;
        if (member.displayName == this.name) return this.tossMe;
        response.text = `${response.text} ${this.generateMentionForMember(member)}!`;
        this.bank.addCoin(member.user.id, member.user.username);
        return response;
    }

    showTotal = (msg: discord.Message | discord.PartialMessage) => {
        return { text: this.bank.listAccounts() };
    }
}