import type { Article } from '../../../types';
import { cloneTemplate, queryElement } from '../../../utils/dom';
import './news.css';

const IMAGE_PLACEHOLDER: string =
    'data:image/svg+xml,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#142033"/><text x="50%" y="54%" fill="#8ef0d2" font-family="sans-serif" font-size="28" text-anchor="middle">News</text></svg>'
    );

class News {
    public draw(articles: readonly Article[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        articles.forEach((item: Article) => fragment.append(this.createArticle(item)));
        queryElement<HTMLElement>(document, '.story-list').replaceChildren(fragment);
    }

    public showMessage(message: string): void {
        const note: HTMLParagraphElement = document.createElement('p');
        note.className = 'story-list__note';
        note.textContent = message;
        queryElement<HTMLElement>(document, '.story-list').replaceChildren(note);
    }

    public setTitle(title: string): void {
        queryElement<HTMLElement>(document, '#story-title').textContent = title;
    }

    private createArticle(item: Article): DocumentFragment {
        const fragment: DocumentFragment = cloneTemplate('story-item-template');
        const photo: HTMLElement = queryElement<HTMLElement>(fragment, '.story__picture');
        const imageUrl: string = (item.urlToImage ?? IMAGE_PLACEHOLDER).replace(/"/g, '%22');

        photo.style.backgroundImage = `url("${imageUrl}"), url("${IMAGE_PLACEHOLDER}")`;
        queryElement<HTMLElement>(fragment, '.story__outlet').textContent = item.source.name;
        queryElement<HTMLElement>(fragment, '.story__headline').textContent = item.title;
        queryElement<HTMLElement>(fragment, '.story__summary').textContent = item.description ?? '';
        queryElement<HTMLElement>(fragment, '.story__author').textContent = item.author ?? item.source.name;

        const date: HTMLTimeElement = queryElement<HTMLTimeElement>(fragment, '.story__date');
        date.dateTime = item.publishedAt;
        date.textContent = formatPublishedDate(item.publishedAt);

        const link: HTMLAnchorElement = queryElement<HTMLAnchorElement>(fragment, '.story__open');
        link.href = item.url;
        return fragment;
    }
}

function formatPublishedDate(publishedAt: string): string {
    const date: Date = new Date(publishedAt);

    if (Number.isNaN(date.getTime())) {
        return publishedAt.slice(0, 10);
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export default News;
