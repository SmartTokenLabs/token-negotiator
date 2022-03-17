export declare class IconView {
    viewContainer: any;
    params: any;
    constructor(viewContainer: any, params: any);
    render(): void;
    onLoad(e: Event): void;
    onError(e: Event): void;
    private createAvatar;
    private generateAvatar;
    private getRandomBackgroundColor;
}
