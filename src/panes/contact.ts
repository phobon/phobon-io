import { Pane, ISlider } from "./../slider/main";
import { delay } from "./../common";

export class Contact extends Pane {
    private _about: JQuery;
    private _blurb: JQuery;
    private _links: JQuery;

    constructor(parent: ISlider) {
        super("contact", "square", parent);
        this._backgroundClass = "gr-contact";
    }

    protected layout() {
        this._site = $("<div class='f-none f-d-row f-j-center f-ai-start c-white f-w w-100'/>");
        this._about = $("<div class='f-none o-0 w-20 f4 lh-title'><span class='d-block'>This site was coded in <a class='d-inline-block' href='https://code.visualstudio.com/' target='_blank'>VS Code</a> using <a class='d-inline-block' href='https://www.typescriptlang.org/' target='_blank'>Typescript</a>, <a class='d-inline-block' href='http://gulpjs.com/' target='_blank'>Gulp</a>, <a class='d-inline-block' href='http://velocityjs.org/' target='_blank'>Velocity</a> and <a class='d-inline-block' href='https://jquery.com/' target='_blank'>JQuery</a>.</br></br>I know a bunch about that stuff, which is pretty cool.</span></div>").appendTo(this._site);

        this._blurb = $("<div class='f-none o-0 w-20 f4 m-horizontal-massive lh-title'><span class='d-block'><a class='d-inline-block' href='https://github.com/phobon/phobon-io' target='_blank'>Phobon</a> coalesced from a dark place in the void at the end of <a class='d-inline-block' href='https://en.wikipedia.org/wiki/2016' target='_blank'>2016</a>.<br/><br/>While I hope that we emerge stronger, let us never speak of that horror again.</span></div>").appendTo(this._site);

        this._links = $("<ul class='f-none f-d-column c-white w-20 f4 lh-copy' />").appendTo(this._site);
        this._links.append("<li class='f-none o-0'><a href='http://github.io/phobon' target='_blank'>github</a></li>");
        this._links.append("<li class='f-none m-t-nano o-0'><a href='http://twitter.com/thenoumenon' target='_blank'>twitter</a></li>");
        this._links.append("<li class='f-none m-t-nano o-0'><a href='http://instagram.com/thenoumenon' target='_blank'>instagram</a></li>");
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
            this._about.velocity("stop");
            this._blurb.velocity("stop");
            this._links.find("> li").velocity("stop");            

            var s = [
                {
                    e: this._about,
                    p: { opacity: 1, translateY: [0, 30] },
                    o: { 
                        duration: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._blurb,
                    p: { opacity: 1, translateY: [0, 30] },
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
            this._about.velocity("stop");
            this._blurb.velocity("stop");
            this._links.find("> li").velocity("stop");            

            var s = [
                {
                    e: this._about,
                    p: { opacity: 0, translateY: [30, 0] },
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