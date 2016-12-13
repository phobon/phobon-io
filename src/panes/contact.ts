import { Pane, ISlider } from "./../slider/main";
import { delay } from "./../utils";

export class Contact extends Pane {
    private _header: JQuery;
    private _links: JQuery;

    constructor(parent: ISlider) {
        super("contact", "square", parent);
        this._backgroundClass = "gr-contact";
    }

    protected layout() {
        this._site = $("<div class='f-none f-d-column f-j-start f-ai-start'/>");
        this._header = $("<h3 class='f-none'>Ben McCormick is phobon</h3>").appendTo(this._site);

        this._links = $("<ul class='f-none f-d-column c-white m-t-massive'/>").appendTo(this._site);
        this._links.append("<li class='f-none'><a class='o-50 f3'>github</a></li>");
        this._links.append("<li class='f-none'><a class='o-50 f3'>twitter</a></li>");
        this._links.append("<li class='f-none'><a class='o-50 f3'>instagram</a></li>");
    }

    loadAssets(): Promise<void> {    
        var p: Promise<void> = new Promise<void>((resolve, reject) => {            
            delay(1000).then(() => {
                console.log("contact loaded");
                resolve();
            });
        });

        return p;
    }

    protected enterActions(): Promise<void> {
        return Promise.resolve();       
    }

    protected exitActions(): Promise<void> {
        return Promise.resolve();  
    }   
}