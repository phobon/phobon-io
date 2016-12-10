import { ISlider, Slider, IPane } from "./slider/main";
import * as Panes from "./panes/main";

var instance: ISlider;

class Phobon extends Slider {
    private static _phobonGlyph: string = '<svg xmlns="http://www.w3.org/2000/svg" class="w-medium h-medium" viewBox="0 0 16 16"><path d="M9.6,6.72V9.28a.32.32,0,0,1-.32.32h-9A.32.32,0,0,1,0,9.28V3.52A.32.32,0,0,1,.32,3.2H2.88a.32.32,0,0,1,.32.32V6.08a.32.32,0,0,0,.32.32H9.28A.32.32,0,0,1,9.6,6.72Z"/><rect x="9.6" width="6.4" height="3.2" rx="0.32" ry="0.32"/><path d="M16,9.92v5.76a.32.32,0,0,1-.32.32H9.92a.32.32,0,0,1-.32-.32V13.12a.32.32,0,0,1,.32-.32h2.56a.32.32,0,0,0,.32-.32V9.92a.32.32,0,0,1,.32-.32h2.56A.32.32,0,0,1,16,9.92Z"/><rect y="12.8" width="3.2" height="3.2" rx="0.32" ry="0.32"/></svg>';

    protected initPanes() {
        this.panes.push(
            new Panes.Home(this),
            new Panes.Hundred(this), 
            new Panes.Contact(this));        
    }

    protected initNavigation() {
        var navigationContainer = $("<div class='absolute h-100 f-none f-d-column w-huge f-j-center' style='right:2rem'/>").appendTo(this.site);
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

    protected layout() {
        this._glyph = $(`<div class='f-none absolute c-white-f c-white-tt-bg br-ra-huge p-small' style='left:3rem;top:3rem'>${Phobon._phobonGlyph}</div>`).appendTo(this.site);
    }
}

$(() => {
    instance = new Phobon($("#root"));
});