declare class OverlayService {
    constructor(config: any, options: any, filter: any);
    onClickOutsideOfOverlay: (e: any) => void;
    eventSender: {
        closeOverlay: () => void;
    };
    isEventFromOverlay(origin: any, tokenOverlayOrigin: any): boolean;
    assignClientListener(): void;
    embedClientOverlay(tokenName: any, tokenOverlayOrigin: any, options: any, filter: any): void;
    eventReciever(data: any): void;
    overlayClickHandler(): void;
}
export default OverlayService;
