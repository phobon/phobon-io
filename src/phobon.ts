import { ISlider, Slider, IPane } from "./slider/main";
import { phobonGlyph } from "./common";
import * as Panes from "./panes/main";

var instance: ISlider;

class Phobon extends Slider {
    private static _phobonExpanded: string = '<svg xmlns="http://www.w3.org/2000/svg" style="width:3.75rem;height:5.9375rem" viewBox="0 0 60 95"><polygon points="0 0 0 25 5 25 5 5 20 5 20 20 25 20 25 0 0 0"/><rect class="cls-1" x="15" y="20" width="5" height="5"/><polygon points="40 0 35 0 35 25 40 25 40 15 45 15 45 10 40 10 40 0"/><polygon points="55 0 55 10 50 10 50 15 55 15 55 25 60 25 60 0 55 0"/><polygon points="55 40 55 55 40 55 40 35 35 35 35 60 60 60 60 40 55 40"/><rect x="50" y="35" width="5" height="5"/><polygon points="35 70 35 95 40 95 40 75 55 75 55 70 35 70"/><rect x="55" y="75" width="5" height="20"/><polygon points="0 35 0 55 5 55 5 40 20 40 20 55 5 55 5 60 25 60 25 35 0 35"/><polygon points="0 70 0 90 5 90 5 75 20 75 20 90 5 90 5 95 25 95 25 70 0 70"/></svg>';

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
        this._glyph.classList.add("z-6", "absolute", "m-large", "c-white-f", "o-80", "cur-pointer", "transition-s");
        this._glyph.style.cssText = "top:0;right:0";
        this._glyph.addEventListener("mouseenter", () => {
            this._glyph.classList.remove("o-80");
        });
        this._glyph.addEventListener("mouseleave", () => {
            this._glyph.classList.add("o-80");
        });
        this._glyph.addEventListener("click", () => {
            this.currentPane = this.panes[0];
        });

        // TODO: SVG in css.
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
            this._loadingContent.classList.add("f-none", "c-white-f", "o-0", "f-j-center", "f-ai-center", "z-1");
            this._loadingSite.appendChild(this._loadingContent);
            // TODO: Add css svg element.

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