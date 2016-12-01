import { Pane, ISlider } from "./../slider/main";

export class Hundred extends Pane {
    constructor(parent: ISlider) {
        super("hundred", parent);
        this._backgroundClass = "gr-100";
    }

    protected layout() {
        this._site = $("<div><h2>hundred</h2></div>");
    }

    protected enterActions(): Promise<void> {
        return Promise.resolve();      
    }

    protected exitActions(): Promise<void> {
        return Promise.resolve();  
    }
}