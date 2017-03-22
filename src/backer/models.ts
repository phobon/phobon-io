export interface IBacker {
    site: HTMLElement;
    image: HTMLImageElement;

    enter(): Promise<void>;
    exit(): Promise<void>;

    loadAssets(): Promise<void>;
}