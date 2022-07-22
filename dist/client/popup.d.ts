import { Client } from "./index";
import { ViewInterface, ViewConstructor, AbstractView } from "./views/view-interface";
export interface PopupOptionsInterface {
    openingHeading?: string;
    issuerHeading?: string;
    repeatAction?: string;
    theme?: string;
    position?: string;
}
export declare class Popup {
    options?: PopupOptionsInterface;
    client: Client;
    popupContainer: any;
    viewContainer: any;
    loadContainer: any;
    currentView: ViewInterface | undefined;
    constructor(options: PopupOptionsInterface, client: Client);
    initialize(): void;
    closeOverlay(): void;
    openOverlay(): void;
    togglePopup(): void;
    updatePopup(ViewClass: ViewConstructor<AbstractView>, data?: any): void;
    showError(...message: string[]): void;
    showLoader(...message: string[]): void;
    dismissLoader(): void;
    private addTheme;
    private assignFabButtonAnimation;
}
