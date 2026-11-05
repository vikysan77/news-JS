import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const isDevelopment: boolean = process.env.APP_MODE !== 'production';
        const configuredUrl: string = process.env.API_URL?.trim() ?? '';

        if (!configuredUrl) {
            throw new Error('API_URL is not defined. Copy .env.example to .env and set API_URL.');
        }

        const baseUrl: string = withTrailingSlash(configuredUrl);
        const apiUrl: string = isDevelopment ? `${baseUrl}mocks/` : baseUrl;
        const apiKey: string = isDevelopment ? '' : process.env.API_KEY ?? '';

        if (!isDevelopment && !apiKey) {
            throw new Error('API_KEY is not defined. Copy .env.example to .env and set API_KEY.');
        }

        super(apiUrl, { apiKey });
    }
}

function withTrailingSlash(url: string): string {
    return url.endsWith('/') ? url : `${url}/`;
}

export default AppLoader;
