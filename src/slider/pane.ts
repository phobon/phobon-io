import { IPane, ISlider } from "models";

export abstract class Pane implements IPane {
    private _id: string;
    private _parent: ISlider;

    protected _site: JQuery;
    
    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    get parent(): ISlider {
        return this._parent;
    }    

    enter(): Promise<void> {
        var p: Promise<void>;

        // If the site hasn't yet been built, build it now.
        if (!this._site) {
            this.layout();
        }

        // Append to the site to the parent so we can actually start to see it.
        this._site.appendTo(this.parent.site);

        this.backgroundActions().then(() => {
            this.enterActions().then(() => {
                p = Promise.resolve();
            });
        });

        return p;
    }

    exit(): Promise<void> {
        return this.exitActions().then(() => {
            // Remove the site at this point because we don't need it until later.
            this._site.detach();
        });
    }

    protected abstract layout();

    protected abstract enterActions(): Promise<void>;
    protected abstract exitActions(): Promise<void>;
    protected abstract backgroundActions(): Promise<void>;
}