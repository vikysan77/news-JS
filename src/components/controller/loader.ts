import {
    DataKind,
    EndpointResponseMap,
    HttpStatus,
    RequestMethod,
    type ErrorCallback,
    type ResponseCallback,
    type StoredCredentials,
} from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: StoredCredentials;
    public constructor(baseLink: string, options: StoredCredentials) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<K extends DataKind>(
        kind: K,
        options: StoredCredentials,
        callback: ResponseCallback<EndpointResponseMap[K]>,
        onError?: ErrorCallback
    ): void {
        const endpoint: string = kind;
        const url: string = this.makeUrl(options, endpoint);

        fetch(url, { method: RequestMethod.Get })
            .then((response: Response) => this.errorHandler(response))
            .then((response: Response) => response.json())
            .then((data: unknown) => {
                callback(data as EndpointResponseMap[K]);
            })
            .catch((error: unknown) => {
                console.error(error);
                if (onError) {
                    onError(error);
                }
            });
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === HttpStatus.Unauthorized || response.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            }
            throw new Error(response.statusText);
        }

        return response;
    }

    private makeUrl(options: StoredCredentials, endpoint: string): string {
        const urlOptions: StoredCredentials = { ...this.options, ...options };
        const searchParams: URLSearchParams = new URLSearchParams();

        (Object.keys(urlOptions) as Array<keyof StoredCredentials>).forEach((key) => {
            const value: string | undefined = urlOptions[key];
            if (value) {
                searchParams.set(key, value);
            }
        });

        const query: string = searchParams.toString();
        return query ? `${this.baseLink}${endpoint}?${query}` : `${this.baseLink}${endpoint}`;
    }
}

export default Loader;
