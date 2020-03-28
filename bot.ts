import { prefix } from './config.json';
import * as discord from 'discord.js';
import { Message } from './message.interface';
import { Bank } from './bank';
import { Giphy } from './giphy';

interface Behavior {
    name: string;
    trigger: string;
    action?: (msg: discord.Message | discord.PartialMessage) => any;
    activity?: boolean;
}


export class Bot {
    private readonly _botName: string = 'CoinTossBot';
    private bank: Bank;
    private giphy: Giphy;


    // Legit
    private coinTossed: Message = { text: `Here's a coin for you`, image: 'THCnhJPopHF2o9Cdeb' };
    private thereYouGo: Message = { text: `Let's see... ah, there you go!`, image: 'ZRMo8QM6M7lM4' };
    private totalCoins: Message = { text: `Toss-tal annihilation!` };
    private greeting: Message = { text: `Hello there!`, image: 'd90kZTTu9ikG4' };
    private resetCoins: Message = { text: `All coins tossed!` };
    private tossMe: Message = { text: `No tossing at me, my purse is already full!` };
    // Errors
    private noMember: Message = { text: `Huh?` };
    private emptyBank: Message = { text: `No coins tossed...`, image: 'UrPISv4AWxFDx7mRxI' };
    // Activities
    private activityToss: Message = { text: `Tossing coins` };

    public behaviors: Behavior[];

    constructor(bank: Bank, giphy: Giphy) {
        this.initBehaviors();
        this.bank = bank;
        this.giphy = giphy;
    }

    get name(): string { return this._botName };
    // Inits
    private initBehaviors = () => {
        this.behaviors = [
            { name: 'CoinTossed', trigger: prefix + 'toss', action: this.tossCoin },
            { name: 'NikiHorse', trigger: prefix + 'showniki', action: this.horseUps },
            { name: 'Total', trigger: prefix + 'total', action: this.showTotal },
            { name: 'Greet', trigger: prefix + 'hello', action: this.greet },
            { name: 'Reset', trigger: prefix + 'reset', action: this.resetBank },
            { name: 'TossAtActivity', trigger: prefix + 'dontstoptossingat', action: this.tossAtActivity, activity: true },
        ]
    }
    // Helpers
    private generateMentionForMember = (member: discord.GuildMember): string => {
        return `<@${member.user.id}>`
    }
    private getImage = async (imageId: string): Promise<string> => {
        try {
            const fileURL = await this.giphy.getGifById(imageId);
            return fileURL;
        } catch (err) {
            console.error(err);
            return err;
        }
    }
    // Activity
    tossAtActivity = (msg: discord.Message | discord.PartialMessage) => {
        const member = msg.mentions.members.first();
        if (!member) return this.activityToss;
        return { ...this.activityToss, text: `${this.activityToss} at ${member.displayName}` };
    }

    greet = async (msg: discord.Message | discord.PartialMessage) => {
        let response: Message = this.greeting;
        response.image = await this.getImage(response.image);
        return response;
    }
    // Trigger Functions
    tossCoin = async (msg: discord.Message | discord.PartialMessage) => {
        let response: Message = this.coinTossed;
        const member = msg.mentions.members.first();
        if (!member) return this.noMember;
        if (member.displayName == this.name) return this.tossMe;
        response.text = `${response.text} ${this.generateMentionForMember(member)}!`;
        response.image = await this.getImage(response.image);
        this.bank.addCoin(member.user.id, member.user.username);
        return response;
    }

    showTotal = async (msg: discord.Message | discord.PartialMessage) => {
        let response: Message = this.emptyBank;
        const bankRes = this.bank.listAccounts();
        if (bankRes.length <= 0) {
            response.image = await this.getImage(response.image);
        } else {
            response = this.totalCoins;
            response.text = bankRes;
        };
        return response;
    }

    horseUps = async (msg: discord.Message | discord.PartialMessage) => {
        let response: Message = this.thereYouGo;
        response.image = await this.getImage(response.image);
        return response;
    }

    resetBank = async (msg: discord.Message | discord.PartialMessage) => {
        let response: Message = this.resetCoins;
    }
}