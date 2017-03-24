export function delay(time: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

export function loadImage(image: HTMLImageElement, src: string): Promise<void> {
    var p: Promise<void> = new Promise<void>((resolve, reject) => {
        image.onload = () => {
            resolve();
        };

        image.src = src;
    });

    return p;
};