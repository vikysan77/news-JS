import {
    DataKind,
    type ErrorCallback,
    type NewsResponse,
    type ResponseCallback,
    type SourceListItem,
    type SourcesResponse,
} from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>, onError?: ErrorCallback): void {
        super.getResp(DataKind.Sources, {}, callback, onError);
    }

    public getNews(
        event: Event,
        onSelect: (item: SourceListItem) => void,
        callback: ResponseCallback<NewsResponse>,
        onError?: ErrorCallback
    ): void {
        const container: EventTarget | null = event.currentTarget;
        const target: EventTarget | null = event.target;

        if (!(container instanceof HTMLElement) || !(target instanceof Element)) {
            return;
        }

        const sourceButton: HTMLButtonElement | null = target.closest<HTMLButtonElement>('.source-list__button');
        const sourceId: string | undefined = sourceButton?.dataset.sourceId;
        const sourceName: string = sourceButton?.textContent?.trim() ?? '';

        if (!sourceButton || !sourceId || container.dataset.source === sourceId) {
            return;
        }

        container.dataset.source = sourceId;
        onSelect({ id: sourceId, name: sourceName });

        super.getResp(
            DataKind.Everything,
            { sources: sourceId },
            (data: NewsResponse) => {
                if (container.dataset.source === sourceId) {
                    callback(data);
                }
            },
            (error: unknown) => {
                if (onError && container.dataset.source === sourceId) {
                    onError(error);
                }
            }
        );
    }
}

export default AppController;
