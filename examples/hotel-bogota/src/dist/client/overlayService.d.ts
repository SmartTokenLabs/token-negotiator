declare class OverlayService {
    constructor(config: any, options: any, filter: any);
    isEventFromOverlay(origin: any, tokenOrigin: any): boolean;
    assignClientListener(): void;
    embedClientModal(tokenName: any, tokenOrigin: any, options: any, filter: any): void;
    clientEventController(data: any): void;
    modalClickHandler(): void;
}
export default OverlayService;
