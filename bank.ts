import { TossUser } from './tossuser.interface';

export class Bank {
    private accounts: TossUser[] = [];
    private totalTossed: number = 0;

    constructor() { }

    createAccount = (id: string, name: string) => {
        this.accounts.push({ userName: name, userId: id, coins: 0, tossed: 0 });
    }

    addCoin = (id: string, name: string, by: string, byname: string): void => {
        this.totalTossed++;
        if (!this.isAccount(id)) { this.createAccount(id, name) };
        if (!this.isAccount(by)) { this.createAccount(by, byname) };
        this.accounts.map(a => {
            if (a.userId == id) { a.coins++ };
            if (a.userId == by) { a.tossed++ };
            return a;
        });
    }

    isAccount = (id: string): boolean => {
        return Boolean(this.accounts.find(a => a.userId == id));
    }

    listAccounts = (): string => {
        const accountsList = this.accounts.sort((a, b) => a.coins - b.coins).map(a => `${a.userName} : ${a.coins} coins, tossed: ${a.tossed || 0}`).join('\n');
        return `\`\`\`${accountsList}\`\`\``;
    }

    resetAccounts = () => {
        this.accounts = [];
        this.totalTossed = 0;
        return;
    }

    getTotalTossed = () => {
        return this.totalTossed;
    }

    biggestSpender = () => {
        if (this.accounts.length <= 0) { return null };
        return this.accounts.reduce((p, c) => (p.tossed > c.tossed) ? p : c);

    }
}