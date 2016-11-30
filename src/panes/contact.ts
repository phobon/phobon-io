import { Pane, ISlider } from "./../slider/main";

export class Contact extends Pane {
    constructor(parent: ISlider) {
        super("contact", parent);
    }

    protected layout() {
    }

    protected enterActions(): Promise<void> {
        return Promise.resolve();       
    }

    protected exitActions(): Promise<void> {
        return Promise.resolve();  
    }

    protected backgroundActions(): Promise<void> {
        return Promise.resolve();
    }
}