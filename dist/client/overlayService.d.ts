declare class OverlayService {
    constructor(config: any, options: any, filter: any);
    isEventFromOverlay(origin: any, tokenOverlayOrigin: any): boolean;
    assignClientListener(): void;
    embedClientOverlay(tokenName: any, tokenOverlayOrigin: any, options: any, filter: any): void;
    clientEventController(data: any): void;
    overlayClickHandler(): void;
}
export default OverlayService;
