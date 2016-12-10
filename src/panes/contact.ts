import { Pane, ISlider } from "./../slider/main";

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
            setTimeout(() => {
                console.log("contact loaded");
                resolve();
            }, 5000);
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