import { Pane, ISlider } from "./../slider/main";

export class Hundred extends Pane {
    private _container: JQuery;
    private _header: JQuery;
    private _divider: JQuery;
    private _details: JQuery;

    private _image: HTMLImageElement;
    private _imageSite: JQuery;

    constructor(parent: ISlider) {
        super("hundred", "round", parent);
        this._backgroundClass = "gr-100";
    }    

    loadAssets(): Promise<void> {    
        var p: Promise<void> = new Promise<void>((resolve, reject) => {      
            this._image = new Image();
            this._image.className = "f-none w-100";           

            this._image.onload = () => { 
                console.log("hundred loaded");
                resolve();
            };
            this._image.src = "images/100.png";
        });

        return p;
    }

    protected layout() {
        this._site = $("<div class='f-none w-100 h-100 f-j-center f-ai-center p-huge c-white f-d-row'/>");
        this._container = $("<div class='f-none w-40 h-100 f-j-center f-ai-start f-d-column p-huge'/>").appendTo(this._site);
        this._header = $("<h3 class='f-none c-white o-0'>hundred days of ui</h3>").appendTo(this._container);

        this._divider = $("<div class='m-t-large to-left br-b-nano c-white-br' style='width:180px'/>").appendTo(this._container);
        this._divider.velocity({ scaleX: 0 }, { duration: 0 });

        this._details = $("<h4 class='f-none m-t-huge o-0'>A design challenge with a new brief every day for 100 days.</h4>").appendTo(this._container);

        this._imageSite = $("<div class='f f-j-center f-ai-center o-0'/>").appendTo(this._site);
        this._imageSite.append(this._image);
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._details.velocity("stop");
            this._imageSite.velocity("stop");

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
                    e: this._image,
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
                    p: { opacity: 0, translateY: [200, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 100,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [200, 0] },
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