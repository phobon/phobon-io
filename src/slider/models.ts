export interface IPane {
    id: string;

    enter(): Promise<void>;
    exit(): Promise<void>;
}

export interface ISlider {
    background: JQuery;      
    site: JQuery;
    navigation: JQuery;

    panes: IPane[];
    currentPane: IPane;

    isStateChanging: boolean;
}