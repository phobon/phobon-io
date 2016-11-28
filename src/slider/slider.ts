import { ISlider, IPane } from "models";

export abstract class Slider implements ISlider {
    private _host: JQuery;    

    private _panes: IPane[];
    private _currentPane: IPane;

    private _isStateChanging: boolean; 

    protected _background: JQuery;
    protected _site: JQuery;    
    protected _navigation: JQuery;

    constructor(host: JQuery) {
        this._host = host;
        this.init();
    }

    get background(): JQuery {
        return this._background;
    }

    get site(): JQuery {
        return this._site;
    }

    get navigation(): JQuery {
        return this._navigation;
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
        if (value.id === this._currentPane.id) {
            console.log(`Pane with the id: ${value.id} already current pane.`);
            return;
        }

        if (this.isStateChanging) {
            console.log(`Cannot change current pane while state is changing.`);
        }

        this._isStateChanging = true;
        this._currentPane.exit().then(() => {
            this._currentPane = value;
            this._currentPane.enter().then(() => {
                this._isStateChanging = false;
            });
        });
    }

    protected abstract initPanes();

    protected abstract initNavigation();

    private init() {
        // Ensure the host is set up to handle content and navigation sites.
        this._host.addClass("f w-100 h-100");         

        // Build the sites as necessary.
        this._background = $("<div class='fixed w-100 h-100 pe-none' style='left:0;top:0'/>").appendTo(this._host);
        this._site = $("<div class='fixed w-100 h-100' style='left:0;top:0'/>").appendTo(this._host);

        // Initialize specific abstract items.
        this.initPanes();
        this.initNavigation();
    }
}