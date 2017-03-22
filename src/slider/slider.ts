import { ISlider, IPane } from "./models";

export abstract class Slider implements ISlider {
    private _host: HTMLElement;    

    private _panes: IPane[];
    private _currentPane: IPane;

    private _isStateChanging: boolean = false; 

    // Backgrounds for transitions.
    private _backgrounds: { [index: string]: HTMLElement } = {};
    private _currentTopBackground: "1" | "2";

    protected _site: HTMLElement;    
    protected _navigation: HTMLElement;
    protected _glyph: HTMLElement;

    constructor(host: HTMLElement) {
        this._host = host;
        this.init();
    }

    get backgrounds(): { top: HTMLElement; bottom: HTMLElement } {
        var b: { top: HTMLElement; bottom: HTMLElement };
        if (this._currentTopBackground === "1") {
            b = { top: this._backgrounds["1"], bottom: this._backgrounds["2"] };
            this._currentTopBackground = "2";
        } else {
            b = { top: this._backgrounds["2"], bottom: this._backgrounds["1"] };
            this._currentTopBackground = "1";
        }

        return b;
    }

    get site(): HTMLElement {
        return this._site;
    }

    get navigation(): HTMLElement {
        return this._navigation;
    }

    get glyph(): HTMLElement {
        return this._glyph;
    }

    get panes(): IPane[] {
        return this._panes;
    }

    get currentPane(): IPane {
        return this._currentPane;
    }

    get isStateChanging(): boolean {
        return this._isStateChanging;
    }

    set currentPane(value: IPane) {
        if (this.isStateChanging) {
            return;
        }

        this._isStateChanging = true;

        var previous = this._currentPane;
        var next = value;

        var setPane = () => {
            this._currentPane = value;

            this._currentPane.enter().then(() => {
                this._isStateChanging = false;
            });
        };

        if (this._currentPane) {
            if (value.id === this._currentPane.id) {
                console.log(`Pane with the id: ${value.id} already current pane.`);
                return;
            }

            Promise.all([this.updateNavigation({ previous: previous, current: value }), this._currentPane.exit()]).then(() => {
                setPane(); 
            });
        } else {
            this.updateNavigation({ previous: previous, current: value }).then(() => {
                setPane();
            });
        }        
    }

    protected abstract loadingStart(): Promise<void>;
    protected abstract loadingEnd(): Promise<void>;

    protected abstract initPanes();

    protected abstract initGlyph();
    protected abstract initNavigation();    

    protected abstract updateNavigation(args: { previous?: IPane; current: IPane }): Promise<void>;

    private async loadAssets(): Promise<void> {
        // Use some snazzy async/await stuff here.
        for (var i = 0; i < this.panes.length; i++) {
            await this.panes[i].loadAssets();
        }

        return Promise.resolve();
    }

    private init() {
        // Ensure the host is set up to handle content and navigation sites.
        this._host.classList.add("f", "w-100", "h-100")

        // Build the sites as necessary.
        this._backgrounds["1"] = document.createElement("div");
        this._backgrounds["1"].classList.add("fixed", "w-100", "h-100", "pe-none", "z-1");
        Velocity.hook(this._backgrounds["1"], "left", "0");
        Velocity.hook(this._backgrounds["1"], "top", "0");
        this._host.appendChild(this._backgrounds["1"]);
        
        this._backgrounds["2"] = document.createElement("div");
        this._backgrounds["2"].classList.add("fixed", "w-100", "h-100", "pe-none", "d-none", "z-0", "o-0");
        Velocity.hook(this._backgrounds["2"], "left", "0");
        Velocity.hook(this._backgrounds["2"], "top", "0");
        this._host.appendChild(this._backgrounds["2"]);

        this._site = document.createElement("div");
        this._site.classList.add("fixed", "w-100", "h-100", "f-none", "f-j-center", "f-ai-center", "z-2");
        Velocity.hook(this._site, "left", "0");
        Velocity.hook(this._site, "top", "0");
        this._host.appendChild(this._site);

        // Initialize specific abstract items.
        this._panes = [];
        this.initPanes();        

        // Initialize scroll-wheel handling. Yes, this scrolljacks, but sometimes you just want to see the world burn.
        window.addEventListener("wheel", e => {
            e.preventDefault();
            if (this._isStateChanging) {
                return;
            }

            // Determine the index of the current pane so we know which one to switch to.
            let i = this.panes.indexOf(this.currentPane);

            if (e.deltaY > 0 && i < this.panes.length) {
                // Scrolled down.
                i++;
            } else if (i > 0) {
                i--;
            } else {
                throw "Index out of range, this should never happen."
            }

            // Set the new current pane.
            this.currentPane = this.panes[i];
        });

        this.loading();
    }

    private async loading(): Promise<void> {
        await this.loadingStart();
        await this.loadAssets();
        await this.loadingEnd().then(() => {
            this.initGlyph();
            this.initNavigation();
            this.currentPane = this.panes[0];
        });
    }
}