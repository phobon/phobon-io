import { Pane, ISlider } from "./../slider/main";
import { delay } from "./../common";

export class Contact extends Pane {
    private _header: JQuery;
    private _links: JQuery;
    private _blurb: JQuery;

    constructor(parent: ISlider) {
        super("contact", "square", parent);
        this._backgroundClass = "gr-contact";
    }

    protected layout() {
        this._site = $("<div class='f-none f-d-column f-j-start f-ai-start c-white'/>");
        this._header = $("<h3 class='f-none o-0'>Check out some of this other stuff.</h3>").appendTo(this._site);

        this._links = $("<ul class='f-none f-d-column c-white m-t-massive'/>").appendTo(this._site);
        this._links.append("<li class='f-none o-0'><a class='o-50 f3'>github</a></li>");
        this._links.append("<li class='f-none m-t-nano o-0'><a class='o-50 f3'>twitter</a></li>");
        this._links.append("<li class='f-none m-t-nano o-0'><a class='o-50 f3'>instagram</a></li>");

        this._blurb = $("<p class='f-none m-t-massive o-0'>This site coalesced from the void at the end of 2016.<br/>May we never speak of that horror again.</p>").appendTo(this._site);
    }

    loadAssets(): Promise<void> {    
        var p: Promise<void> = new Promise<void>((resolve, reject) => {  
            console.log("contact loaded");
            resolve();
        });

        return p;
    }

    protected enterActions(): Promise<void> {
        var p: Promise<void> = new Promise<void>((resolve, reject) => {
            this._header.velocity("stop");
            this._links.find("> li").velocity("stop");
            this._blurb.velocity("stop");

            var s = [
                {
                    e: this._header,
                    p: { opacity: 1, translateY: [0, -30] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._blurb,
                    p: { opacity: 0.7, translateY: [0, 30] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._links.find("> li"),
                    p: { opacity: 1, translateX: [0, -30] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo",
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

    protected exitActions(): Promise<void> {
        var p: Promise<void> = new Promise<void>((resolve, reject) => {
            this._header.velocity("stop");
            this._links.find("> li").velocity("stop");
            this._blurb.velocity("stop");

            var s = [
                {
                    e: this._header,
                    p: { opacity: 0, translateY: [-30, 0] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._blurb,
                    p: { opacity: 0, translateY: [30, 0] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._links.find("> li"),
                    p: { opacity: 0, translateX: [-30, 0] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo",
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