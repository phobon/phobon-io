import { Pane, ISlider } from "./../slider/main";

export class Hundred extends Pane {
    private _container: JQuery;
    private _header: JQuery;
    private _divider: JQuery;

    private _details: JQuery;
    private _link: JQuery;

    private _images: { [ index: string ]: { site?: JQuery; image: HTMLImageElement } } = {};

    constructor(parent: ISlider) {
        super("hundred", "round", parent);
        this._backgroundClass = "gr-100";
    }    

    async loadAssets(): Promise<void> {    
        // Load images as necessary.
        var background = new Image();
        background.className = "f-none o-20";
        this._images["background"] = {
            image: background
        }

        var foreground = new Image();
        foreground.className = "f-none";
        this._images["foreground"] = {
            image: foreground
        }

        await this.loadImage(background, "images/second.png");
        await this.loadImage(foreground, "images/first.png");

        console.log("hundred loaded");

        return Promise.resolve();
    }    

    protected layout() {
        this._site = $("<div class='f-none w-100 h-100 f-j-center f-ai-center p-huge c-white f-d-row'/>");
        this._container = $("<div class='f-none w-40 h-100 f-j-center f-ai-start f-d-column p-huge z1'/>").appendTo(this._site);
        
        var headerSite = $("<div class='f-none of-hidden'/>").appendTo(this._container);
        this._header = $("<h3 class='f-none c-white o-0'>hundred.</h3> ").appendTo(headerSite);

        this._divider = $("<div class='m-t-small to-left c-white-br o-70' style='width:230px;border-bottom:2px solid'/>").appendTo(this._container);
        this._divider.velocity({ scaleX: 0 }, { duration: 0 });

        this._details = $("<div class='f-none m-t-huge o-0 f4 lh-title'><span class='d-block'>100 days of experimentation in user interface and experience design inspired by <a class='d-inline-block' href='http://www.dailyui.co/'>dailyui</a>.<br/><br/>I started this ordeal on <a class='d-inline-block' target='_blank' href='https://thegrid.ai/100ui/1-signup/'>December 15, 2015</a> and finished on <a class='d-inline-block' href='https://twitter.com/thenoumenon/status/727319863266418688'>May 3, 2016</a>.</div>").appendTo(this._container);

        this._link = $("<div class='f-none m-t-huge o-0 f4'><a href='http://phobon.io/100' target='_blank'>check it out</a></div>").appendTo(this._container);

        this._site.append("<div class='f'/>");

        // Set up background images.
        this._images["background"].site = $("<div class='absolute f-none o-0' style='right:0;bottom:0;'/>").appendTo(this._site);
        this._images["background"].site.append(this._images["background"].image);

        this._images["foreground"].site = $("<div class='absolute f-none o-0' style='right:0;bottom:0;'/>").appendTo(this._site);
        this._images["foreground"].site.append(this._images["foreground"].image);
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._details.velocity("stop");
            this._images["foreground"].site.velocity("stop");
            this._images["background"].site.velocity("stop");
            this._link.velocity("stop");

            var s = [
                { 
                    e: this._divider,
                    p: { scaleX: 1 },
                    o: { 
                        duration: 1000,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._header,
                    p: { opacity: [1, 0], translateY: [0, 32] },
                    o: { 
                        sequenceQueue: false,
                        duration: 500,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._details,
                    p: { opacity: [1, 0], translateY: [0, 32] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._link,
                    p: { opacity: [1, 0], translateY: [0, 32] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._images["foreground"].site,
                    p: { opacity: [1, 0], translateX: [0, 150], translateY: [0, 300] },
                    o: {
                        duration: 500,
                        easing: "easeOutExpo",
                        sequenceQueue: false,
                        delay: 200,
                        complete: () => {
                            resolve();
                        } 
                    }
                },
                {
                    e: this._images["background"].site,
                    p: { opacity: [1, 0], translateX: [0, 16], translateY: [0, 16] },
                    o: {
                        duration: 1500,
                        sequenceQueue: false,
                        delay: 200,
                        easing: "easeOutExpo"
                    }
                }
            ];

            $.Velocity.RunSequence(s);
         });        

        return p; 
    }

    protected exitActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._details.velocity("stop");
            this._images["foreground"].site.velocity("stop");
            this._images["background"].site.velocity("stop");
            this._link.velocity("stop");

            var s = [
                {
                    e: this._images["foreground"].site,
                    p: { opacity: 0, translateX: [150, 0], translateY: [300, 0] },
                    o: {
                        duration: 400,     
                        easing: "easeInExpo"
                    }
                },
                {
                    e: this._images["background"].site,
                    p: { opacity: 0, translateX: [16, 0], translateY: [16, 0] },
                    o: {
                        duration: 500,    
                        sequenceQueue: false,
                        delay: 150,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._divider,
                    p: { scaleX: 0 },
                    o: { 
                        delay: 300,
                        duration: 800,
                        sequenceQueue: false,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._details,
                    p: { opacity: 0, translateY: [32, 0] },
                    o: { 
                        duration: 600,
                        sequenceQueue: false,
                        delay: 100,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [32, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 200,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._link,
                    p: { opacity: 0, translateY: [32, 0] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
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