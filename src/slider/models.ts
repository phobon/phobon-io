export interface IPane {
    id: string;

    enter(): Promise<void>;
    exit(): Promise<void>;
}

export interface ISlider {
    backgrounds: { top: JQuery; bottom: JQuery };      
    site: JQuery;
    navigation: JQuery;

    panes: IPane[];
    currentPane: IPane;

    isStateChanging: boolean;
}