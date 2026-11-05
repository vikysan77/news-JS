import AppController from '../controller/controller';
import AppView from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources: HTMLElement | null = document.querySelector<HTMLElement>('.source-list');
        const filter: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#source-filter');
        const searchForm: HTMLFormElement | null = document.querySelector<HTMLFormElement>('#source-search');

        if (!sources || !filter || !searchForm) {
            throw new Error('App markup is incomplete.');
        }

        sources.addEventListener('click', (event: Event) => {
            this.controller.getNews(
                event,
                (item) => {
                    this.view.setActiveSource(item.id);
                    this.view.setFeedTitle(item.name);
                    this.view.showNewsMessage('Loading...');
                },
                (data) => this.view.drawNews(data),
                () => this.view.showNewsMessage('Could not load stories.')
            );
        });

        filter.addEventListener('input', () => this.view.filterSources(filter.value));
        searchForm.addEventListener('submit', (event: Event) => event.preventDefault());

        this.view.showSourcesMessage('Loading sources...');
        this.controller.getSources(
            (data) => this.view.drawSources(data),
            () => this.view.showSourcesMessage('Could not load sources.')
        );
    }
}

export default App;
