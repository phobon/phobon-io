import { Pane, ISlider } from "./../slider/main";
import { phobonGlyph } from "./../common";

export class Home extends Pane {
    private _delay: number = 500;

    private _icon: HTMLElement;
    private _header: HTMLElement;
    private _blurb: HTMLElement;

    private _mouseWheel: HTMLElement;

    constructor(parent: ISlider) {
        super("home", parent);
        this._backgroundClass = "gr-home";
    }

    loadAssets(): Promise<void> {    
        return Promise.resolve();
    }

    protected layout() {
        this._site = document.createElement("div");
        this._site.classList.add("f", "home", "h-100", "f-d-column", "f-j-center", "f-ai-center", "c-white");

        this._site.appendChild(document.createElement("div")).classList.add("f");
        
        var iconSite = document.createElement("div");
        iconSite.classList.add("icon", "w-80", "f-j-start", "f-ai-start", "f-none");
        this._site.appendChild(iconSite);
        
        this._icon = document.createElement("div");
        this._icon.classList.add("f-none", "c-gray-ll-f", "c-gray-ll-tt-bg", "br-ra-huge", "o-0");
        iconSite.appendChild(this._icon);

        // TODO: Phobon glyph in CSS

        this._header = document.createElement("div");
        this._header.classList.add("f-none", "w-80", "o-0", "f-d-row", "f-w");
        this._site.appendChild(this._header);

        this._blurb = document.createElement("div");
        this._blurb.classList.add("f-none", "w-80", "o-0", "f-d-row", "f-w");
        this._site.appendChild(this._blurb);

        // this._header = $(`<div class='f-none w-80 o-0 f-d-row f-w'><span class='d-block'>Hi, I'm Ben; a software developer based in <a class='d-inline-block' href='https://en.wikipedia.org/wiki/Perth' target='_blank'>Perth, WA</a>. I make user interfaces; focusing on building cool, performant front-end experiences.</span></div>`).appendTo(this._site);
        // this._blurb = $("<div class='f-none w-80 f-d-row f-w m-t-large o-0'><span class='d-block'>I'm currently at <a class='d-inline-block' href='http://acquire.com.au' target='_blank'>acQuire</a> but I've recently helped <a class='d-inline-block' href='http://thestudiophysio.com' target='_blank'>The Studio</a> with their boutique style.</span></div>.").appendTo(this._site);        

        this._site.appendChild(document.createElement("div")).classList.add("f");

        this._mouseWheel = document.createElement("div");
        this._mouseWheel.classList.add("mouse", "o-0", "w-medium", "h-large", "br-ra-medium", "c-white-br", "f-j-center", "f-ai-start", "br-nano", "m-b-large");
        this._site.appendChild(this._mouseWheel);

        var innerMouse = document.createElement("span");
        innerMouse.classList.add("mousewheel", "m-t-tiny", "f-none", "c-white-bg", "br-ra-large", "w-nano", "h-nano");
        this._mouseWheel.appendChild(innerMouse);
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
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
                    e: this._mouseWheel,
                    p: { opacity: 0.6 },
                    o: { 
                        sequenceQueue: false,
                        delay: 100,
                        duration: 400,
                        easing: "easeOutExpo"
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

            Velocity.RunSequence(s);
         });        

        return p;        
    }

    protected exitActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => {
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
                    e: this._mouseWheel,
                    p: { opacity: 0 },
                    o: { 
                        sequenceQueue: false,
                        duration: 400,
                        delay: 50,
                        easing: "easeOutExpo"
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

            Velocity.RunSequence(s);
        });        

        return p;      
    }
}
