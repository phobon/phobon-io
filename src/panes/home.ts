import { Pane, ISlider } from "./../slider/main";

export class Home extends Pane {
    private _header: JQuery;
    private _blurb: JQuery;

    constructor(parent: ISlider) {
        super("home", parent);
    }

    protected layout() {
        this._site = $("<div />");
        this._header = $("<h1>hi, my name is ben</h1>").appendTo(this._site);
        this._blurb = $("<p>I'm a software developer, user experience designer and a semi-professional dog-walker. I'm mostly focused on building awesome, performant front-end stuff.</p>").appendTo(this._site);        
    }

    protected enterActions(): Promise<void> {
        var p: Promise<void> = new Promise((resolve, reject) => {});

        var s = [
            { 
                e: this._site,
                p: { opacity: 1 },
                o: { 
                    duration: 250,
                    easing: "easeOutExpo"
                }
            },
            { 
                e: this._header,
                p: { opacity: 1 },
                o: { 
                    duration: 250,
                    easing: "easeOutExpo"
                }
            },
            { 
                e: this._blurb,
                p: { opacity: 1 },
                o: { 
                    duration: 250,
                    easing: "easeOutExpo",
                    complete: () => {
                        p = Promise.resolve();
                    }
                }
            }
        ];

        $.Velocity.RunSequence(s);

        return p;        
    }

    protected exitActions(): Promise<void> {
        var p: Promise<void> = new Promise((resolve, reject) => {});

        var s = [            
            { 
                e: this._header,
                p: { opacity: 0 },
                o: { 
                    duration: 250,
                    easing: "easeOutExpo"
                }
            },
            { 
                e: this._blurb,
                p: { opacity: 0 },
                o: { 
                    duration: 250,
                    easing: "easeOutExpo"
                }
            },
            { 
                e: this._site,
                p: { opacity: 0 },
                o: { 
                    duration: 250,
                    easing: "easeOutExpo",
                    complete: () => {
                        p = Promise.resolve();
                    }
                }
            }
        ];

        $.Velocity.RunSequence(s);

        return p;      
    }

    protected backgroundActions(): Promise<void> {
        return Promise.resolve();
    }
}
