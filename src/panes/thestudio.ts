import { Pane, ISlider } from "./../slider/main";
import { loadImage } from "./../common";

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

        await loadImage(background, "images/ts2.png");
        await loadImage(foreground, "images/ts1.png");
    }

    protected layout() {
        this._site = document.createElement("div");
        this._site.classList.add("f-none", "w-100", "h-100", "f-j-center", "f-ai-center", "c-white", "f-d-row");
        
        this._site.appendChild(document.createElement("div")).classList.add("f");
        
        this._container = document.createElement("div");
        this._container.classList.add("f-none", "text-container", "h-100", "f-j-center", "f-ai-start", "f-d-column");
        this._site.appendChild(this._container);

        var headerSite = document.createElement("div");
        headerSite.classList.add("f-none", "of-hidden");
        this._container.appendChild(headerSite);

        this._header = document.createElement("div");
        this._header.classList.add("f-none", "header", "c-white", "o-0", "f-d-column");
        headerSite.appendChild(this._header);

        var year = document.createElement("span");
        year.classList.add("f-none", "o-50", "year");
        year.innerText = "2016";
        this._header.appendChild(year);

        var title = document.createElement("span");
        title.classList.add("f-none");
        title.innerText = "The Studio<br/>Physiotherapy & Clinical Pilates.";
        this._header.appendChild(title);

        this._divider = document.createElement("div");
        this._divider.classList.add("divider", "to-left", "c-white-br", "o-70");
        this._divider.style.cssText = "width:230px;border-bottom:2px solid;transform:scale(0,1)";
        this._container.appendChild(this._divider);
        
        this._details = document.createElement("div");
        this._details.classList.add("f-none", "o-0", "detail", "lh-title");
        this._details.innerText = "The Studio is a boutique pilates and physiotherapy clinic located in Perth, Western Australia.<br/><br/>The brand is built around the personality and philosophy of its owner - clean, bright and striking.";
        this._container.appendChild(this._details);

        //this._details = $("<div class='detail f-none o-0'>The Studio is a boutique pilates and physiotherapy clinic located in Perth, Western Australia.<br/><br/>The brand is built around the personality and philosophy of its owner - clean, bright and striking.</dive>").appendTo(this._container);

        this._link = document.createElement("div");
        this._link.classList.add("f-none", "o-0", "detail");
        this._container.appendChild(this._link);

        var l = document.createElement("a");
        l.href = "http://thestudiophysio.com";
        l.target = "_blank";
        l.innerText = "Check it out.";
        this._link.appendChild(l);      

        // Set up background images.
        this._images["background"].site = document.createElement("div");
        this._images["background"].site.classList.add("background-img", "absolute", "f-none", "o-0");
        this._images["background"].site.style.cssText = "left:5rem;top:0;";
        this._site.appendChild(this._images["background"].site);

        this._images["foreground"].site = document.createElement("div");
        this._images["foreground"].site.classList.add("background-img", "absolute", "f-none", "o-0");
        this._images["foreground"].site.style.cssText = "left:5rem;top:0;";
        this._site.appendChild(this._images["backgforegroundround"].site); 
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