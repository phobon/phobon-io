import { Pane, ISlider } from "./../slider/main";
import { delay } from "./../utils";

export class Contact extends Pane {
    constructor(parent: ISlider) {
        super("contact", "square", parent);
        this._backgroundClass = "gr-contact";
    }

    protected layout() {
        this._site = $("<div><h2>contact</h2></div>");
    }

    loadAssets(): Promise<void> {    
        var p: Promise<void> = new Promise<void>((resolve, reject) => {
            console.log("contact loaded");
            delay(8000).then(() => {
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