export interface IPane {
    id: string;

    enter(): Promise<void>;
    exit(): Promise<void>;

    loadAssets(): Promise<void>;
}

export interface ISlider {
    glyph: HTMLElement;
    backgrounds: { top: HTMLElement; bottom: HTMLElement };      
    site: HTMLElement;
    navigation: HTMLElement;

    panes: IPane[];
    currentPane: IPane;

    isStateChanging: boolean;
}