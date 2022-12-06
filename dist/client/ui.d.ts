import { Client } from "./index";
import { ViewInterface, ViewConstructor } from "./views/view-interface";
export declare type UIType = "popup" | "inline";
export declare type PopupPosition = 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right';
export declare type UItheme = 'light' | 'dark';
export declare type ViewType = "start" | "main" | "wallet";
export interface UIOptionsInterface {
    uiType?: UIType;
    containerElement?: string;
    openingHeading?: string;
    issuerHeading?: string;
    repeatAction?: string;
    theme?: UItheme;
    position?: PopupPosition;
    autoPopup?: boolean;
    alwaysShowStartScreen?: boolean;
    viewOverrides?: {
        [type: string]: ViewConstructor<ViewInterface>;
    };
}
export interface UiInterface {
    viewContainer: HTMLElement;
    initialize(): Promise<void>;
    updateUI(ViewClass: ViewConstructor<ViewInterface> | ViewType, data?: any): any;
    closeOverlay(): void;
    openOverlay(): void;
    togglePopup(): void;
    viewIsNotStart(): boolean;
    showError(error: string | Error): any;
    showError(error: string | Error, canDismiss: boolean): any;
    setErrorRetryCallback(retryCallback?: Function): any;
    showLoader(...message: string[]): any;
    showLoaderDelayed(messages: string[], delay: number): any;
    showLoaderDelayed(messages: string[], delay: number, openOverlay: boolean): any;
    dismissLoader(): any;
    switchTheme(newTheme: UItheme): any;
}
export declare class Ui implements UiInterface {
    protected static UI_CONTAINER_HTML: string;
    protected static FAB_BUTTON_HTML: string;
    options?: UIOptionsInterface;
    client: Client;
    popupContainer: any;
    viewContainer: any;
    loadContainer: any;
    currentView: ViewInterface | undefined;
    retryCallback?: Function;
    retryButton: any;
    constructor(options: UIOptionsInterface, client: Client);
    initialize(): Promise<void>;
    getViewClass(type: ViewType): ViewConstructor<ViewInterface>;
    getStartScreen(): Promise<ViewConstructor<ViewInterface>>;
    canSkipWalletSelection(): Promise<boolean>;
    initializeUIType(): void;
    closeOverlay(): void;
    openOverlay(): void;
    togglePopup(): void;
    updateUI(ViewClass: ViewConstructor<ViewInterface> | ViewType, data?: any): void;
    viewIsNotStart(): boolean;
    showError(error: string | Error, canDismiss?: boolean): void;
    setErrorRetryCallback(retryCallback?: Function): void;
    loadTimer?: any;
    showLoaderDelayed(messages: string[], delay: number, openOverlay?: boolean): void;
    protected cancelDelayedLoader(): void;
    showLoader(...message: string[]): void;
    dismissLoader(): void;
    protected setTheme(theme: UItheme): void;
    private assignFabButtonAnimation;
    private validateTheme;
    switchTheme(newTheme: UItheme): void;
}
