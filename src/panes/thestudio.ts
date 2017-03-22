import { Pane, ISlider } from "./../slider/main";

export class TheStudio extends Pane {
    private _container: HTMLElement;
    private _header: HTMLElement;
    private _divider: HTMLElement;

    private _details: HTMLElement;
    private _link: HTMLElement;

    private _images: { [ index: string ]: { site?: HTMLElement; image: HTMLImageElement } } = {};

    constructor(parent: ISlider) {
        super("thestudio", parent);
        this._backgroundClass = "gr-loading2";
    }    

    async loadAssets(): Promise<void> {    
        // Load images as necessary.
        var background = new Image();
        background.className = "background-img o-80 h-100";
        this._images["background"] = {
            image: background
        }

        var foreground = new Image();
        foreground.className = "background-img h-100";
        this._images["foreground"] = {
            image: foreground
        }

        await this.loadImage(background, "images/ts2.png");
        await this.loadImage(foreground, "images/ts1.png");

        return Promise.resolve();
    }

    protected layout() {
        this._site = $("<div class='f-none w-100 h-100 f-j-center f-ai-center c-white f-d-row'/>");

        this._site.append("<div class='f'/>");
        this._container = $("<div class='f-none text-container h-100 f-j-center f-ai-start f-d-column'/>").appendTo(this._site);
        this._header = $("<div class='header f-none c-white o-0 f-d-column'><span class='o-50 f-none year'>2016</span><span class='f-none'>The Studio<br/>Physiotherapy & Clinical Pilates.</span></div>").appendTo(this._container);

        this._divider = $("<div class='divider to-left c-white-br o-70' style='width:230px;border-bottom:2px solid'/>").appendTo(this._container);
        this._divider.velocity({ scaleX: 0 }, { duration: 0 });

        this._details = $("<div class='detail f-none o-0'>The Studio is a boutique pilates and physiotherapy clinic located in Perth, Western Australia.<br/><br/>The brand is built around the personality and philosophy of its owner - clean, bright and striking.</dive>").appendTo(this._container);

        this._link = $("<div class='detail f-none o-0'><a href='http://thestudiophysio.com' target='_blank'>Check it out.</a></div>").appendTo(this._container);    

        // Set up background images.
        this._images["background"].site = $("<div class='background-img absolute f-none o-0' style='left:5rem;top:0;'/>").appendTo(this._site);
        this._images["background"].site.append(this._images["background"].image);

        this._images["foreground"].site = $("<div class='background-img absolute f-none o-0' style='left:5rem;top:0;'/>").appendTo(this._site);
        this._images["foreground"].site.append(this._images["foreground"].image);    
    }

    protected enterActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => {
            var s: any[] = [
                { 
                    e: this._divider,
                    p: { scaleX: [1, 0] },
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
                }                
            ];

            if (this._images["foreground"].site.classList.contains("f-none")) {
                s.push({
                    e: this._images["foreground"].site,
                    p: { opacity: [1, 0], translateY: [0, -300] },
                    o: {
                        duration: 500,
                        easing: "easeOutExpo",
                        sequenceQueue: false,
                        delay: 200,
                        complete: () => {
                            resolve();
                        } 
                    }
                });
            }

            if (this._images["background"].site.classList.contains("f-none")) {
                s.push({
                    e: this._images["background"].site,
                    p: { opacity: [1, 0], translateX: 256 },
                    o: {
                        duration: 500,
                        sequenceQueue: false,
                        delay: 200,
                        easing: "easeOutExpo"
                    }
                });
            }

            Velocity.RunSequence(s);
         });        

        return p; 
    }

    protected exitActions(): Promise<void> {
        var p: Promise<any> = new Promise((resolve, reject) => { 
            var s: any[] = [];
            
            if (this._images["background"].site.classList.contains("f-none")) {
                s.push({
                    e: this._images["background"].site,
                    p: { opacity: 0, translateX: 0 },
                    o: {
                        duration: 400,     
                        easing: "easeOutExpo"
                    }
                });
            }

            if (this._images["foreground"].site.classList.contains("f-none")) {
                s.push({
                    e: this._images["foreground"].site,
                    p: { opacity: 0, translateY: -300 },
                    o: {
                        duration: 500,    
                        sequenceQueue: false,
                        delay: 75,
                        easing: "easeOutExpo"
                    }
                });
            }
            
            s.push(
                { 
                    e: this._divider,
                    p: { scaleX: 0 },
                    o: { 
                        duration: 400,
                        delay: 100,
                        sequenceQueue: false,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._link,
                    p: { opacity: 0, translateY: [32, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        easing: "easeOutExpo"
                    }
                },
                { 
                    e: this._details,
                    p: { opacity: 0, translateY: [32, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 50,
                        easing: "easeOutExpo"
                    }
                },                
                { 
                    e: this._header,
                    p: { opacity: 0, translateY: [32, 0] },
                    o: { 
                        duration: 400,
                        sequenceQueue: false,
                        delay: 100,
                        easing: "easeOutExpo",
                        complete: () => {
                            resolve();
                        } 
                    }
                }                
            );

            Velocity.RunSequence(s);
         });        

        return p; 
    }    
}