import { ISlider, Slider, IPane } from "./slider/main";
import * as Panes from "./panes/main";

var instance: ISlider;

class Phobon extends Slider {
    private static _phobonExpanded: string = '<svg xmlns="http://www.w3.org/2000/svg" style="width:3.75rem;height:5.9375rem" viewBox="0 0 60 95"><polygon points="0 0 0 25 5 25 5 5 20 5 20 20 25 20 25 0 0 0"/><rect class="cls-1" x="15" y="20" width="5" height="5"/><polygon points="40 0 35 0 35 25 40 25 40 15 45 15 45 10 40 10 40 0"/><polygon points="55 0 55 10 50 10 50 15 55 15 55 25 60 25 60 0 55 0"/><polygon points="55 40 55 55 40 55 40 35 35 35 35 60 60 60 60 40 55 40"/><rect x="50" y="35" width="5" height="5"/><polygon points="35 70 35 95 40 95 40 75 55 75 55 70 35 70"/><rect x="55" y="75" width="5" height="20"/><polygon points="0 35 0 55 5 55 5 40 20 40 20 55 5 55 5 60 25 60 25 35 0 35"/><polygon points="0 70 0 90 5 90 5 75 20 75 20 90 5 90 5 95 25 95 25 70 0 70"/></svg>';

    private _loadingSite: JQuery;
    private _loadingContent: JQuery;

    // Loading backgrounds.
    private _loadingBackgrounds: JQuery[];

    protected initPanes() {
        this.panes.push(
            new Panes.Home(this),
            new Panes.Hundred(this), 
            new Panes.TheStudio(this),
            new Panes.Contact(this));        
    }

    protected initNavigation() {
        var navigationContainer = $("<div class='absolute h-100 f-none f-d-column w-huge f-j-center z5' style='right:2rem'/>").appendTo(this.site);
        this._navigation = $("<ul class='f-none f-d-column f-ai-end w-100'/>").appendTo(navigationContainer);
        this.panes.forEach((p, i, a) => {
            let n = $(`<li class='nav-item ${p.glyph}' data-index='${i}' class='o-0'></li>`).appendTo(this._navigation);            
            n.on("click", () => {
                let index = n.data("index");
                this.currentPane = this.panes[index];
            });
        });

        // TODO: Some entering transition would be nice here.
    }

    protected updateNavigation(args: { previous?: IPane; current: IPane }): Promise<void> {
        // Remove selection from the old navigation item.
        var i = this.panes.indexOf(args.previous);
        if (i > -1) {
            this._navigation.find(`[data-index='${i}']`).removeClass("active");
        }

        // Add selection from the new navigation item.
        var n = this.panes.indexOf(args.current);
        if (n > -1) {
            this._navigation.find(`[data-index='${n}']`).addClass("active");
        }

        return Promise.resolve();
    }        

    protected loadingStart(): Promise<void> {
        var p: Promise<void> = new Promise<void>((resolve, reject) => {
            this._loadingSite = $("<div class='f-none f-j-center f-ai-center to-left-top' style='width:5.75rem;height:8.9375rem'/>").appendTo(this.site);

            this._loadingBackgrounds = [];
            this._loadingBackgrounds.push($(`<div class='absolute w-100 h-100 gr-loading1' style='margin:auto;left:0:top:0;width:5.75rem;height:8.9375rem'/>`).appendTo(this._loadingSite));
            this._loadingBackgrounds.push($("<div class='absolute w-100 h-100 gr-loading2 o-0' style='margin:auto;left:0:top:0;width:5.75rem;height:8.9375rem'/>").appendTo(this._loadingSite));
            this._loadingContent = $(`<div class='f-none c-white-f o-0' style='z-index:1'>${Phobon._phobonExpanded}</div>`).appendTo(this._loadingSite);

            this._loadingSite.velocity({ scaleX: 0, scaleY: 0.05 }, { duration: 0 });
            this._loadingContent.velocity({ scaleX: 0.8, scaleY: 0.8 }, { duration: 0 });

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
                            this._loadingBackgrounds[1].addClass("pulse");
                            resolve();                       
                        } 
                    }
                }
            ];

            $.Velocity.RunSequence(s);
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

            $.Velocity.RunSequence(s);
        });

        return p;
    }
}

$(() => {
    instance = new Phobon($("#root"));
});