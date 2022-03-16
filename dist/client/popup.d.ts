import { Client } from "./index";
import { ViewInterface, ViewConstructor, AbstractView } from "./views/view-interface";
interface PopupOptionsInterface {
    openingHeading: string;
    issuerHeading: string;
    repeatAction: string;
}
export declare class Popup {
    options: PopupOptionsInterface;
    client: Client;
    popupContainer: any;
    viewContainer: any;
    loadContainer: any;
    currentView: ViewInterface | undefined;
    overlayShouldClose: boolean;
    constructor(options: PopupOptionsInterface, client: Client);
    initialize(): void;
    windowClickEvt(event: any): void;
    overlayClickEvt(): void;
    closeOverlay(): void;
    togglePopup(): void;
    updatePopup(ViewClass: ViewConstructor<AbstractView>, data?: any): void;
    showError(...message: string[]): void;
    showLoader(...message: string[]): void;
    dismissLoader(): void;
    private addTheme;
    private assignFabButtonAnimation;
}
export {};
