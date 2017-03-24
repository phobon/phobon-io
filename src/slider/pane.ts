import { IPane, ISlider } from "./models";

export abstract class Pane implements IPane {
    private _id: string;
    private _parent: ISlider;

    private _activeBackground: HTMLElement;
    protected _backgroundClass: string;

    protected _site: HTMLElement;
    
    constructor(id: string, parent: ISlider) {
        this._id = id;
        this._parent = parent;
    }

    get id(): string {
        return this._id;
    }

    get parent(): ISlider {
        return this._parent;
    }    

    async enter(): Promise<void> {
        // If the site hasn't yet been built, build it now.
        if (!this._site) {
            this.layout();
        }

        // Append to the site to the parent so we can actually start to see it.
        this.parent.site.appendChild(this._site);

        await this.backgroundActions(this.parent.backgrounds);
        await this.enterActions();
    }

    async exit(): Promise<void> {
        await this.exitActions();
        this._site.remove();
    }    

    abstract loadAssets(): Promise<void>;

    protected abstract layout();

    protected abstract enterActions(): Promise<void>;
    protected abstract exitActions(): Promise<void>;     

    private backgroundActions(targets: { top: HTMLElement; bottom: HTMLElement }): Promise<void> {
        let p: Promise<void> = new Promise<void>((resolve, reject) => {
            // Swap the top and bottom backgrounds.
            Velocity.hook(targets.top, "z-index", "0");

            Velocity.hook(targets.bottom, "z-index", "1");
            targets.bottom.classList.remove("d-none");    

            // Apply the relevant background gradient to the correct background.
            targets.bottom.classList.add(this._backgroundClass);
            targets.bottom.setAttribute("data-bg", this._backgroundClass);

            Velocity.animate(targets.bottom, { opacity: [1, 0] }, {
                duration: 800,
                easing: "easeOutExpo",
                complete: () => {
                    targets.top.classList.add("d-none", "o-0");
                    let bg = targets.top.getAttribute("data-bg");
                    if (bg) {
                        targets.top.classList.remove(bg);
                    }

                    resolve();
                }
            });
        });

        return p;
    }
}