import { ISlider, IPane } from "./models";

export abstract class Slider implements ISlider {
    private _host: JQuery;    

    private _panes: IPane[];
    private _currentPane: IPane;

    private _isStateChanging: boolean = false; 

    // Backgrounds for transitions.
    private _backgrounds: { [index: string]: JQuery } = {};
    private _currentTopBackground: "1" | "2";

    protected _site: JQuery;    
    protected _navigation: JQuery;
    protected _glyph: JQuery;

    constructor(host: JQuery) {
        this._host = host;
        this.init();
    }

    get backgrounds(): { top: JQuery; bottom: JQuery } {
        var b: { top: JQuery; bottom: JQuery };
        if (this._currentTopBackground === "1") {
            b = { top: this._backgrounds["1"], bottom: this._backgrounds["2"] };
            this._currentTopBackground = "2";
        } else {
            b = { top: this._backgrounds["2"], bottom: this._backgrounds["1"] };
            this._currentTopBackground = "1";
        }

        return b;
    }

    get site(): JQuery {
        return this._site;
    }

    get navigation(): JQuery {
        return this._navigation;
    }

    get glyph(): JQuery {
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
            console.log(`Cannot change current pane while state is changing.`);
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

    protected abstract initGlyph();

    protected abstract initPanes();

    protected abstract initNavigation();    

    protected abstract updateNavigation(args: { previous?: IPane; current: IPane }): Promise<void>;

    protected async loadAssets(): Promise<void> {
        // Doing some chain-loading here because Promise.all() is being a bit flaky.
        var p = this.panes[0].loadAssets();
        for (var i = 1; i < this.panes.length; i++) {
            p.then(this.panes[i].loadAssets);
        }

        return p;
    }

    private init() {
        // Ensure the host is set up to handle content and navigation sites.
        this._host.addClass("f w-100 h-100");         

        // Build the sites as necessary.
        this._backgrounds["1"] = $("<div class='fixed w-100 h-100 pe-none' style='left:0;top:0;z-index:1'/>").appendTo(this._host);
        this._backgrounds["2"] = $("<div class='fixed w-100 h-100 pe-none d-none' style='left:0;top:0;opacity:0;z-index:0'/>").appendTo(this._host);
        this._site = $("<div class='fixed w-100 h-100' style='left:0;top:0;z-index:2'/>").appendTo(this._host);

        // Initialize specific abstract items.
        this._panes = [];
        this.initPanes();
        this.initNavigation();
        this.initGlyph();

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
    }
}