import { Pane, ISlider } from "./../slider/main";

export class Home extends Pane {
    private static _phobonGlyph: string = '<svg xmlns="http://www.w3.org/2000/svg" class="w-medium h-medium" viewBox="0 0 16 16"><path d="M9.6,6.72V9.28a.32.32,0,0,1-.32.32h-9A.32.32,0,0,1,0,9.28V3.52A.32.32,0,0,1,.32,3.2H2.88a.32.32,0,0,1,.32.32V6.08a.32.32,0,0,0,.32.32H9.28A.32.32,0,0,1,9.6,6.72Z"/><rect x="9.6" width="6.4" height="3.2" rx="0.32" ry="0.32"/><path d="M16,9.92v5.76a.32.32,0,0,1-.32.32H9.92a.32.32,0,0,1-.32-.32V13.12a.32.32,0,0,1,.32-.32h2.56a.32.32,0,0,0,.32-.32V9.92a.32.32,0,0,1,.32-.32h2.56A.32.32,0,0,1,16,9.92Z"/><rect y="12.8" width="3.2" height="3.2" rx="0.32" ry="0.32"/></svg>';       

    private _delay: number = 1000;

    private _icon: JQuery;
    private _header: JQuery;
    private _blurb: JQuery;

    constructor(parent: ISlider) {
        super("home", "square", parent);
        this._backgroundClass = "gr-home";
    }

    loadAssets(): Promise<void> {    
        var p: Promise<void> = new Promise<void>((resolve, reject) => {
            console.log("home loaded");
            resolve();
        });

        return p;
    }

    protected layout() {
        this._site = $("<div class='f h-100 f-d-column f-j-center f-ai-center c-white'/>");
        var iconSite = $("<div class='f-none w-80 f-j-start f-ai-start m-b-massive'/>").appendTo(this._site);
        this._icon = $(`<div class='f-none c-gray-ll-f c-gray-ll-tt-bg br-ra-huge p-small o-0'>${Home._phobonGlyph}</div></div>`).appendTo(iconSite);
        this._header = $(`<h3 class='f-none w-80 o-0 f-d-row f-w'>Hi, I'm Ben, a software developer based in Perth, Western Australia. I make user interfaces; focusing on building cool, performant front-end experiences.</h3>`).appendTo(this._site);
        this._blurb = $("<h3 class='f-none w-80 f-d-row f-w m-t-large o-0'>I'm currently at<a class='f-none m-horizontal-small o-50' href='http://acquire.com.au' target='_blank'>acQuire</a>but I've recently helped<a class='f-none m-horizontal-small o-50' href='http://thestudiophysio.com' target='_blank'>The Studio</a>with their boutique style.</h3>.").appendTo(this._site);        
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
                    p: { opacity: [1, 0], translateY: [0, 100] },
                    o: { 
                        duration: 500,
                        delay: 150,
                        sequenceQueue: false,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._blurb,
                    p: { opacity: [1, 0], translateY: [0, 100] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
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
                    e: this._icon,
                    p: { scaleX: 0, scaleY: 0 },
                    o: { 
                        delay: this._delay,
                        duration: 500,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [-100, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 150,
                        easing: "easeInExpo"
                    }
                },
                { 
                    e: this._blurb,
                    p: { opacity: 0, translateY: [-100, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 150,
                        easing: "easeInExpo",
                        complete: () => {
                            resolve();
                        }
                    }
                }
            ];

            $.Velocity.RunSequence(s);
        });        

        return p;      
    }
}
