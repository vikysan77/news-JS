import type { NewsResponse, SourcesResponse } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        if (data.status === 'error') {
            this.news.showMessage(data.message);
            return;
        }

        const articles = data.articles.slice(0, 10);
        if (articles.length === 0) {
            this.news.showMessage('No stories for this source.');
            return;
        }
        this.news.draw(articles);
    }

    public drawSources(data: SourcesResponse): void {
        if (data.status === 'error') {
            this.sources.showMessage(data.message);
            return;
        }

        this.sources.draw(data.sources);
    }

    public filterSources(query: string): void {
        this.sources.filter(query);
    }

    public showNewsMessage(message: string): void {
        this.news.showMessage(message);
    }

    public showSourcesMessage(message: string): void {
        this.sources.showMessage(message);
    }

    public setFeedTitle(title: string): void {
        this.news.setTitle(title);
    }

    public setActiveSource(sourceId: string): void {
        this.sources.setActive(sourceId);
    }
}

export default AppView;
