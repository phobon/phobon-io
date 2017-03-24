import { ISlider, Slider, IPane } from "./slider/main";
import * as Panes from "./panes/main";

var instance: ISlider;

class Phobon extends Slider {
    private _loadingSite: HTMLElement;
    private _loadingContent: HTMLElement;

    // Loading backgrounds.
    private _loadingBackgrounds: HTMLElement[];

    protected initPanes() {
        this.panes.push(
            new Panes.Home(this),
            new Panes.Hundred(this), 
            new Panes.TheStudio(this),
            new Panes.Contact(this));        
    }

    protected initGlyph() {    
        this._glyph = document.createElement("div");
        this._glyph.classList.add("z-6", "absolute", "m-large", "c-white-f", "o-80", "cur-pointer", "transition-s", "phobon-glyph", "nav-phobon-glyph");
        this._glyph.style.cssText = "top:0;right:0";
        this._glyph.addEventListener("click", () => {
            this.currentPane = this.panes[0];
        });
    }

    protected initNavigation() {
        var navContainer = document.createElement("div");
        navContainer.classList.add("nav-container", "absolute", "f-none", "z-5");
        this.site.appendChild(navContainer);

        this._navigation = document.createElement("ul");
        this._navigation.classList.add("f-none");
        navContainer.appendChild(this._navigation);

        this.panes.forEach((p, i, a) => {
            let n = document.createElement("li");
            n.classList.add("nav-item", "o-0");
            n.setAttribute("data-nav-index", i.toString());
            this._navigation.appendChild(n);

            n.addEventListener("click", () => {
                let index = n.getAttribute("data-nav-index");
                this.currentPane = this.panes[index];
            });
        });

        // TODO: Some entering transition would be nice here.
    }

    protected updateNavigation(args: { previous?: IPane; current: IPane }): Promise<void> {
        // Remove selection from the old navigation item.
        var i = this.panes.indexOf(args.previous);
        if (i > -1) {
            document.querySelector(`[data-nav-index="${i}"]`).classList.remove("active");
        }

        // Add selection from the new navigation item.
        var n = this.panes.indexOf(args.current);
        if (n > -1) {
            document.querySelector(`[data-nav-index="${n}"]`).classList.add("active");
        }

        return Promise.resolve();
    }        

    protected loadingStart(): Promise<void> {
        var p: Promise<void> = new Promise<void>((resolve, reject) => {
            this._loadingSite = document.createElement("div");
            this._loadingSite.classList.add("f-none", "f-j-center", "f-ai-center", "to-left-top");
            this._loadingSite.style.cssText = "width:5.75rem;height:8.9375rem";
            this.site.appendChild(this._loadingSite);

            var l1 = document.createElement("div");
            l1.classList.add("absolute", "w-100", "h-100", "gr-loading1");
            l1.style.cssText = "margin:auto;left:0:top:0;width:5.75rem;height:8.9375rem";
            this._loadingSite.appendChild(l1);

            var l2 = document.createElement("div");
            l2.classList.add("absolute", "w-100", "h-100", "gr-loading2");
            l2.style.cssText = "margin:auto;left:0:top:0;width:5.75rem;height:8.9375rem";
            this._loadingSite.appendChild(l2);

            this._loadingBackgrounds = [
                l1, l2
            ];
            
            this._loadingContent = document.createElement("div");
            this._loadingContent.classList.add("f-none", "c-white-f", "o-0", "f-j-center", "f-ai-center", "z-1", "phobon-glyph-expanded");
            this._loadingSite.appendChild(this._loadingContent);

            Velocity.animate(this._loadingSite, { scaleX: 0, scaleY: 0.05 }, { duration: 0 });
            Velocity.animate(this._loadingContent, { scaleX: 0.8, scaleY: 0.8 }, { duration: 0 });

            var s = [
                {
                    e: this._loadingSite,
                    p: { scaleX: 1 }, 
                    o: { duration: 350, easing: "easeOutExpo" }
                },
                {
                    e: this._loadingSite,
                    p: { scaleY: 1 }, 
                    o: { 
                        delay: 100,
                        duration: 350, 
                        sequenceQueue: false,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._loadingContent,
                    p: { opacity: 0.8, scaleX: 1, scaleY: 1 },
                    o: { 
                        duration: 500, 
                        easing: "easeOutExpo", 
                        complete: () => {
                            this._loadingBackgrounds[1].classList.add("pulse");
                            resolve();                       
                        } 
                    }
                }
            ];

            Velocity.RunSequence(s);
        });

        return p;        
    }

    protected loadingEnd(): Promise<void> {
        var p: Promise<void> = new Promise<void>((resolve, reject) => {  
            var s = [
                {
                    e: this._loadingContent,
                    p: { opacity: 0, scaleX: 0.8, scaleY: 0.8 },
                    o: { 
                        duration: 300, 
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._loadingSite,
                    p: { scaleY: 0.05 }, 
                    o: { duration: 300, easing: "easeOutExpo" }
                },
                {
                    e: this._loadingSite,
                    p: { scaleX: 0 }, 
                    o: { 
                        duration: 300, 
                        easing: "easeOutExpo", 
                        complete: () => {
                            this._loadingSite.remove();

                            setTimeout(() => {
                                resolve();
                            }, 250);                        
                        } 
                    }
                }
            ];

            Velocity.RunSequence(s);
        });

        return p;
    }    
}

document.onload = () => {
    instance = new Phobon(document.getElementById("root"));
};