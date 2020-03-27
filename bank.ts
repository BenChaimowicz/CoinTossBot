import { TossUser } from './tossuser.interface';

export class Bank {
    private accounts: TossUser[] = [];
    private static totalTossed: number = 0;

    constructor() { }

    createAccount = (id: string, name: string) => {
        this.accounts.push({ userName: name, userId: id, coins: 0 });
    }

    addCoin = (id: string, name: string): void => {
        Bank.totalTossed++;
        if (!this.isAccount(id)) { this.createAccount(id, name) };
        this.accounts.map(a => {
            if (a.userId == id) { a.coins++; console.log(`Coin added to account`) };
            return a;
        });
    }

    isAccount = (id: string): boolean => {
        return Boolean(this.accounts.find(a => a.userId == id));
    }

    listAccounts = (): string => {
        const accountsList = this.accounts.sort((a, b) => a.coins - b.coins).map(a => `\`\`${a.userName} : ${a.coins} coins\`\``).join('\n');
        return `${accountsList}`;
    }
}