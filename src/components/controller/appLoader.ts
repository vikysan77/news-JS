import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const apiUrl: string = process.env.API_URL ?? '';
        const apiKey: string = process.env.API_KEY ?? '';

        if (!apiUrl) {
            throw new Error('API_URL is not defined. Copy .env.example to .env and set API_URL.');
        }

        super(apiUrl, { apiKey });
    }
}

export default AppLoader;
