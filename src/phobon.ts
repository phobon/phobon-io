import { ISlider, Slider, IPane } from "slider/main";
import * as Panes from "panes/main";

var instance: ISlider;

class Phobon extends Slider {
    protected initPanes() {
        this.panes.push(
            new Panes.Home(),
            new Panes.Hundred(), 
            new Panes.Contact());        
    }

    protected initNavigation() {
        this._navigation = $("<ul />").appendTo(this.site);
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