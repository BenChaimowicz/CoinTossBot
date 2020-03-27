import { giphyToken } from './config.json';
import axios, { } from 'axios';

export class Giphy {
    private readonly baseURL: string = `https://api.giphy.com/v1/gifs/`
    private readonly tokenParam: string = `?api_key=${giphyToken}`;

    public getGifById = async (id: string): Promise<any> => {
        try {
            const gif: any = await axios.get(this.generateURL(id));
            return gif.data[0];
        } catch (err) { return 'error' };
    }

    private generateURL = (id: string): string => {
        return this.baseURL + id + this.tokenParam;
    }
}