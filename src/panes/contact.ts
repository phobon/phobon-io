import { Pane } from "slider/main";

export class Contact extends Pane {
    constructor() {
        super("contact");
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