import { Pane, ISlider } from "./../slider/main";

export class Hundred extends Pane {
    constructor(parent: ISlider) {
        super("hundred", parent);
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