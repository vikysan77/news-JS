export enum DataKind {
    Sources = 'sources',
    Everything = 'everything',
}

export enum RequestMethod {
    Get = 'GET',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type SourceListItem = Pick<Source, 'id' | 'name'>;

export type ArticleSource = Pick<Source, 'name'> & {
    id: string | null;
};

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesSuccessResponse {
    status: 'ok';
    sources: Source[];
}

export interface NewsSuccessResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export type SourcesResponse = SourcesSuccessResponse | ApiErrorResponse;

export type NewsResponse = NewsSuccessResponse | ApiErrorResponse;

export interface EndpointResponseMap {
    [DataKind.Sources]: SourcesResponse;
    [DataKind.Everything]: NewsResponse;
}

export interface QueryParams {
    apiKey: string;
    sources: string;
}

export type StoredCredentials = Readonly<Partial<QueryParams>>;

export type ResponseCallback<T> = (data: T) => void;

export type ErrorCallback = (error: unknown) => void;
