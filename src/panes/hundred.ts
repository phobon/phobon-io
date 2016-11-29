import { Pane } from "slider/main";

export class Hundred extends Pane {
    constructor() {
        super("100ui");
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