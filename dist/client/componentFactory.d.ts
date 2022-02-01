interface CreateTokenInterface {
    tokenIssuerKey: string;
    title: string;
    index: number;
    emblem: string;
    data: any;
    toggleState: boolean;
}
export declare const createOpeningViewMarkup: (openingHeading?: string) => string;
export declare const createWalletSelectionViewMarkup: () => string;
export declare const createIssuerViewMarkup: (heading?: string) => string;
export declare const issuerConnectTabMarkup: (title: string, issuer: string) => string;
export declare const issuerConnectIframeMarkup: (title: string, issuer: string) => string;
export declare const createTokenMarkup: (config: CreateTokenInterface) => string;
export declare const createFabButtonMarkup: () => string;
export {};
