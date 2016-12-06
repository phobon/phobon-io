export interface IPane {
    id: string;

    glyph: "square" | "round";

    loadingPromise: Promise<void>;

    enter(): Promise<void>;
    exit(): Promise<void>;
}

export interface ISlider {
    glyph: JQuery;
    backgrounds: { top: JQuery; bottom: JQuery };      
    site: JQuery;
    navigation: JQuery;

    panes: IPane[];
    currentPane: IPane;

    isStateChanging: boolean;
}