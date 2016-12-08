import { Pane, ISlider } from "./../slider/main";

export class Hundred extends Pane {
    private _container: JQuery;
    private _header: JQuery;
    private _details: JQuery;
    private _image: JQuery;

    constructor(parent: ISlider) {
        super("hundred", "round", parent);
        this._backgroundClass = "gr-100";
    }    

    loadAssets(): Promise<void> {        
        return Promise.resolve();    
    }

    protected layout() {
        this._site = $("<div class='f-none w-100 h-100 f-j-center f-ai-center p-huge c-white f-d-row'/>");
        this._container = $("<div class='f-none w-40 h-100 f-j-start f-ai-start f-d-column'/>").appendTo(this._site);
        this._header = $("<h3 class='f-none c-white o-0'>hundred days of ui.</h3>").appendTo(this._container);
        this._details = $("<h3 class='f-none m-t-large o-0'>A design challenge with a new brief every day for 100 days.</h3>").appendTo(this._container);

        this._image = $("<div class='f f-j-center f-ai-center o-0'><img class='f-none w-100' src='images/100.png'/></div>").appendTo(this._site);
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            this._header.velocity("stop");
            this._details.velocity("stop");
            this._image.velocity("stop");

            var s = [
                { 
                    e: this._header,
                    p: { opacity: [1, 0], translateY: [0, 200] },
                    o: { 
                        delay: 300,
                        duration: 1000,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._details,
                    p: { opacity: [0.5, 0], translateY: [0, 200] },
                    o: { 
                        duration: 500,
                        sequenceQueue: false,
                        delay: 300,
                        easing: "easeOutExpo"
                    }
                },
                {
                    e: this._image,
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