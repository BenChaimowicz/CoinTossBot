import { giphyToken } from './config.json';
import axios, { AxiosResponse } from 'axios';

export class Giphy {
    private readonly baseURL: string = `https://api.giphy.com/v1/gifs/`
    private readonly tokenParam: string = `?api_key=${giphyToken}`;
    private cache: GiphyCache[] = [];

    public getGifById = async (id: string): Promise<any> => {
        try {
            const cache = this.cacheCheck(id);
            let gif;
            if (!cache) {
                const res: AxiosResponse = await axios.get(this.generateURL(id));
                gif = res.data.data.images.fixed_height.url;
                this.addCache({ id: id, url: gif });
            } else {
                gif = cache;
            }
            return gif;
        } catch (err) { return 'error' };
    }

    private generateURL = (id: string): string => {
        return this.baseURL + id + this.tokenParam;
    }

    private cacheCheck = (id: string) => {
        const cachedResult = this.cache.find(g => g.id == id);
        if (cachedResult) { return cachedResult.url }
        else { return cachedResult };
    }
    private addCache = (giphy: GiphyCache) => {
        this.cache.push(giphy);
    }
}

interface GiphyCache {
    id: string;
    url: string;
}