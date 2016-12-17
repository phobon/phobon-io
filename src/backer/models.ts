export interface IBacker {
    site: JQuery;
    image: HTMLImageElement;

    enter(): Promise<void>;
    exit(): Promise<void>;

    loadAssets(): Promise<void>;
}