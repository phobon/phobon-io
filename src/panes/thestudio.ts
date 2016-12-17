import { Pane, ISlider } from "./../slider/main";

export class TheStudio extends Pane {
    private _container: JQuery;
    private _header: JQuery;
    private _divider: JQuery;

    private _details: JQuery;
    private _link: JQuery;

    private _image: HTMLImageElement;
    private _imageSite: JQuery;

    constructor(parent: ISlider) {
        super("thestudio", "round", parent);
        this._backgroundClass = "gr-loading2";
    }    

    loadAssets(): Promise<void> {    
        var p: Promise<void> = new Promise<void>((resolve, reject) => {      
            this._image = new Image();
            this._image.className = "f-none w-100";           

            this._image.onload = () => { 
                console.log("thestudio loaded");
                resolve();
            };
            this._image.src = "images/100.png";
        });

        return p;
    }

    protected layout() {
        this._site = $("<div class='f-none w-100 h-100 f-j-center f-ai-center p-huge c-white f-d-row'/>");
        this._imageSite = $("<div class='f f-j-center f-ai-center o-0'/>").appendTo(this._site);
        this._imageSite.append(this._image);

        this._container = $("<div class='f-none w-40 h-100 f-j-center f-ai-start f-d-column p-huge'/>").appendTo(this._site);
        this._header = $("<h3 class='f-none c-white o-0'>The Studio<br/>Physiotherapy & Clinical Pilates.</h3>").appendTo(this._container);

        this._divider = $("<div class='m-t-medium to-left br-b-tiny c-white-br o-50' style='width:180px'/>").appendTo(this._container);
        this._divider.velocity({ scaleX: 0 }, { duration: 0 });

        this._details = $("<h4 class='f-none m-t-huge o-0'>The Studio is a boutique pilates and physiotherapy clinic located in Perth, Western Australia.<br/><br/>The brand is built around the personality and philosophy of its owner - clean, bright and striking.</h4>").appendTo(this._container);

        this._link = $("<h4 class='f-none m-t-huge o-0'><a href='http://thestudiophysio.com' target='_blank'>check it out</a></h4>").appendTo(this._container);        
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._details.velocity("stop");
            this._imageSite.velocity("stop");
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
                    p: { opacity: [1, 0], translateY: [0, 100] },
                    o: { 
                        sequenceQueue: false,
                        duration: 500,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._details,
                    p: { opacity: [0.5, 0], translateY: [0, 100] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._link,
                    p: { opacity: [0.7, 0], translateY: [0, 100] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._imageSite,
                    p: { opacity: [1, 0], scaleX: [1, 0.8], scaleY: [1, 0.8] },
                    o: {
                        duration: 500,
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
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._details.velocity("stop");

            var s = [
                {
                    e: this._imageSite,
                    p: { opacity: 0, scaleX: 0.8, scaleY: 0.8 },
                    o: {
                        duration: 400,     
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
                    p: { opacity: 0, translateY: [100, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 100,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [100, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 200,
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