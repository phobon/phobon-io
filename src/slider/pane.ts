import { IPane, ISlider } from "./models";

export abstract class Pane implements IPane {
    private _id: string;
    private _parent: ISlider;

    private _glyph: "square" | "round";

    private _activeBackground: JQuery;
    protected _backgroundClass: string;

    protected _site: JQuery;
    
    constructor(id: string, glyph: "square" | "round", parent: ISlider) {
        this._id = id;
        this._glyph = glyph;
        this._parent = parent;
    }

    get id(): string {
        return this._id;
    }

    get glyph(): "square" | "round" {
        return this._glyph;
    }

    get parent(): ISlider {
        return this._parent;
    }    

    enter(): Promise<void> {
        var p: Promise<void> = new Promise((resolve, reject) => { 
            // If the site hasn't yet been built, build it now.
            if (!this._site) {
                this.layout();
            }

            // Append to the site to the parent so we can actually start to see it.
            this._site.appendTo(this.parent.site);

            this.backgroundActions(this.parent.backgrounds).then(() => {
                this.enterActions().then(() => {
                    resolve();
                });
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

    private backgroundActions(targets: { top: JQuery; bottom: JQuery }): Promise<void> {
        let p: Promise<void> = new Promise<void>((resolve, reject) => {
            // Swap the top and bottom backgrounds.
            targets.top.css("z-index", 0);
            targets.bottom.css("z-index", 1);            
            targets.bottom.removeClass("d-none");            

            // Apply the relevant background gradient to the correct background.
            targets.bottom.addClass(this._backgroundClass);
            targets.bottom.data("bg", this._backgroundClass);

            targets.bottom.velocity(
                { 
                    opacity: [ 1, 0 ] 
                }, 
                { 
                    duration: 2000,
                    easing: "easeOutExpo",
                    complete: () => {
                        targets.top.addClass("d-none");
                        targets.top.css({ "opacity": 0 });
                        let bg = targets.top.data("bg");
                        if (bg) {
                            targets.top.removeClass(bg);
                        }

                        resolve();
                    }
                });
        });

        return p;
    }
}