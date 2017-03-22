import { IBacker } from "./models";

export class Backer implements IBacker {
    private _site: HTMLElement;

    private _src: string;
    private _image: HTMLImageElement;

    constructor(site: HTMLElement, src: string) {
        this._site = site;
        this._src = src;
    }

    get site(): HTMLElement {
        return this._site;
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    enter(): Promise<void> {
        return Promise.resolve();
    }

    exit(): Promise<void> {
        return Promise.resolve();
    }

    loadAssets(): Promise<void> {
        var p: Promise<void> = new Promise<void>((resolve, reject) => {      
            this._image = new Image();
            this._image.className = "f-none w-100";           

            this._image.onload = () => { 
                resolve();
            };
            this._image.src = this._src;
        });

        return p;
    }
}