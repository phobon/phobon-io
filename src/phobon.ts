import { ISlider, Slider, IPane } from "./slider/main";
import * as Panes from "./panes/main";

var instance: ISlider;

class Phobon extends Slider {
    private static glyph: string = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.6,6.72V9.28a.32.32,0,0,1-.32.32h-9A.32.32,0,0,1,0,9.28V3.52A.32.32,0,0,1,.32,3.2H2.88a.32.32,0,0,1,.32.32V6.08a.32.32,0,0,0,.32.32H9.28A.32.32,0,0,1,9.6,6.72Z"/><rect x="9.6" width="6.4" height="3.2" rx="0.32" ry="0.32"/><path d="M16,9.92v5.76a.32.32,0,0,1-.32.32H9.92a.32.32,0,0,1-.32-.32V13.12a.32.32,0,0,1,.32-.32h2.56a.32.32,0,0,0,.32-.32V9.92a.32.32,0,0,1,.32-.32h2.56A.32.32,0,0,1,16,9.92Z"/><rect y="12.8" width="3.2" height="3.2" rx="0.32" ry="0.32"/></svg>';

    protected initPanes() {
        this.panes.push(
            new Panes.Home(this),
            new Panes.Hundred(this), 
            new Panes.Contact(this));        
    }

    protected initNavigation() {
        this._navigation = $("<ul class='absolute f-none f-d-column' style='right:2rem;top:2rem'/>").appendTo(this.site);
        this.panes.forEach((p, i, a) => {
            let n = $(`<li data-index='${i}'>${p.id}</li>`).appendTo(this._navigation);            
            n.on("click", () => {
                let index = n.data("index");
                this.currentPane = this.panes[index];
            });
        });

        // Finally, set the current pane. Should just be the first one in the array.
        this.currentPane = this.panes[0];
    }
}

$(() => {
    instance = new Phobon($("#root"));
});