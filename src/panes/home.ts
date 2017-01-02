import { Pane, ISlider } from "./../slider/main";
import { phobonGlyph } from "./../common";

export class Home extends Pane {
    private _delay: number = 500;

    private _icon: JQuery;
    private _header: JQuery;
    private _blurb: JQuery;

    constructor(parent: ISlider) {
        super("home", "square", parent);
        this._backgroundClass = "gr-home";
    }

    loadAssets(): Promise<void> {    
        return Promise.resolve();
    }

    protected layout() {
        this._site = $("<div class='f h-100 f-d-column f-j-center f-ai-center c-white'/>");
        var iconSite = $("<div class='f-none w-80 f-j-start f-ai-start m-b-massive'/>").appendTo(this._site);
        this._icon = $(`<div class='f-none c-gray-ll-f c-gray-ll-tt-bg br-ra-huge p-small o-0'>${phobonGlyph}</div>`).appendTo(iconSite);
        this._header = $(`<div class='f-none w-80 o-0 f-d-row f-w f3'><span class='d-block'>Hi, I'm Ben; a software developer based in <a class='d-inline-block' href='https://en.wikipedia.org/wiki/Perth' target='_blank'>Perth, WA</a>. I make user interfaces; focusing on building cool, performant front-end experiences.</span></div>`).appendTo(this._site);
        this._blurb = $("<div class='f-none w-80 f-d-row f-w m-t-large o-0 f3'><span class='d-block'>I'm currently at <a class='d-inline-block' href='http://acquire.com.au' target='_blank'>acQuire</a> but I've recently helped <a class='d-inline-block' href='http://thestudiophysio.com' target='_blank'>The Studio</a> with their boutique style.</span></div>.").appendTo(this._site);        
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._icon.velocity("stop");
            this._header.velocity("stop");
            this._blurb.velocity("stop");

            var s = [
                { 
                    e: this._icon,
                    p: { opacity: [1, 0], scaleX: [1, 0], scaleY: [1, 0] },
                    o: { 
                        delay: this._delay,
                        duration: 600,
                        easing: "spring"
                    }
                },
                { 
                    e: this._header,
                    p: { opacity: [1, 0], translateY: [0, 75] },
                    o: { 
                        duration: 500,
                        delay: 75,
                        sequenceQueue: false,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._blurb,
                    p: { opacity: [1, 0], translateY: [0, 75] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 150,
                        easing: "easeOutExpo",
                        complete: () => {
                            this._delay = 0;
                            resolve();
                        }
                    }
                }
            ];

            $.Velocity.RunSequence(s);
         });        

        return p;        
    }

    protected exitActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => {
            this._icon.velocity("stop");
            this._header.velocity("stop");
            this._blurb.velocity("stop");

            var s = [                
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [-75, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        easing: "easeInExpo"
                    }
                },
                { 
                    e: this._blurb,
                    p: { opacity: 0, translateY: [-75, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 50,
                        easing: "easeInExpo"
                    }
                },
                { 
                    e: this._icon,
                    p: { scaleX: 0, scaleY: 0 },
                    o: { 
                        delay: 100,
                        sequenceQueue: false,
                        duration: 400,
                        easing: "easeOutExpo",
                        complete: () => {
                            resolve();
                        }
                    }
                },
            ];

            $.Velocity.RunSequence(s);
        });        

        return p;      
    }
}
