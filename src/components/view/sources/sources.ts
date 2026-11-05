import type { Source, SourceListItem } from '../../../types';
import { cloneTemplate, queryElement } from '../../../utils/dom';
import './sources.css';

class Sources {
    private sources: readonly SourceListItem[] = [];
    private query = '';
    public draw(data: readonly Source[]): void {
        this.sources = data;
        this.render();
    }

    public filter(query: string): void {
        this.query = query;
        this.render();
    }

    public showMessage(message: string): void {
        queryElement<HTMLElement>(document, '.source-list').replaceChildren();
        this.setStatus(message);
    }

    public setActive(sourceId: string): void {
        queryElement<HTMLElement>(document, '.source-list')
            .querySelectorAll<HTMLElement>('.source-list__button')
            .forEach((item: HTMLElement) => {
                item.classList.toggle('source-list__button--selected', item.dataset.sourceId === sourceId);
            });
    }

    private render(): void {
        const container: HTMLElement = queryElement<HTMLElement>(document, '.source-list');
        const activeId: string = container.dataset.source ?? '';
        const normalizedQuery: string = this.query.trim().toLowerCase();
        const visible: SourceListItem[] = this.sources.filter((item: SourceListItem) =>
            item.name.toLowerCase().includes(normalizedQuery)
        );
        const fragment: DocumentFragment = document.createDocumentFragment();

        if (visible.length === 0) {
            container.replaceChildren();
            this.setStatus(this.sources.length === 0 ? 'No sources.' : 'Nothing matches.');
            return;
        }

        visible.forEach((item: SourceListItem) => {
            fragment.append(this.createItem(item, activeId));
        });
        this.setStatus('');
        container.replaceChildren(fragment);
    }

    private setStatus(message: string): void {
        const status: HTMLElement = queryElement<HTMLElement>(document, '#source-status');
        status.hidden = message.length === 0;
        status.textContent = message;
    }

    private createItem(item: SourceListItem, activeId: string): HTMLLIElement {
        const fragment: DocumentFragment = cloneTemplate('source-item-template');
        const entry: HTMLLIElement = queryElement<HTMLLIElement>(fragment, '.source-list__entry');
        const button: HTMLButtonElement = queryElement<HTMLButtonElement>(fragment, '.source-list__button');

        button.textContent = item.name;
        button.dataset.sourceId = item.id;
        button.classList.toggle('source-list__button--selected', item.id === activeId);
        return entry;
    }
}

export default Sources;
