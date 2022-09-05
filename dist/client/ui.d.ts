import { Client } from "./index";
import { ViewInterface, ViewConstructor, AbstractView } from "./views/view-interface";
export declare type UIType = "popup" | "inline";
export interface UIOptionsInterface {
    uiType?: UIType;
    containerElement?: string;
    openingHeading?: string;
    issuerHeading?: string;
    repeatAction?: string;
    theme?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right';
    autoPopup?: boolean;
}
export declare class Ui {
    private static UI_CONTAINER_HTML;
    private static FAB_BUTTON_HTML;
    options?: UIOptionsInterface;
    client: Client;
    popupContainer: any;
    viewContainer: any;
    loadContainer: any;
    currentView: ViewInterface | undefined;
    retryCallback?: Function;
    retryButton: any;
    constructor(options: UIOptionsInterface, client: Client);
    initialize(): void;
    initializeUIType(): void;
    closeOverlay(): void;
    openOverlay(): void;
    togglePopup(): void;
    updateUI(ViewClass: ViewConstructor<AbstractView>, data?: any): void;
    viewIsNotStart(): boolean;
    showError(error: string | Error, canDismiss?: boolean): void;
    setErrorRetryCallback(retryCallback?: Function): void;
    loadTimer?: any;
    showLoaderDelayed(messages: string[], delay: number, openOverlay?: boolean): void;
    cancelDelayedLoader(): void;
    showLoader(...message: string[]): void;
    dismissLoader(): void;
    private setTheme;
    private assignFabButtonAnimation;
    private validateTheme;
    switchTheme(newTheme: string): void;
}
