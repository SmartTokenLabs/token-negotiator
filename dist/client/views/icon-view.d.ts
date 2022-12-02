export declare class IconView {
    viewContainer: any;
    params: any;
    constructor(viewContainer: any, params: any);
    render(): void;
    onLoad(_e: Event): void;
    onError(_e: Event): void;
    private createAvatar;
    private generateAvatar;
    private getRandomBackgroundColor;
}
