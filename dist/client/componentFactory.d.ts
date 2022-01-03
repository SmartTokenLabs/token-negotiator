interface CreateTokenInterface {
    tokenIssuerKey: string;
    title: string;
    index: number;
    emblem: string;
    data: any;
    toggleState: boolean;
}
export declare const createOverlayMarkup: (heading?: string) => string;
export declare const issuerConnect: (issuer: any) => string;
export declare const createToken: (config: CreateTokenInterface) => string;
export declare const createFabButton: () => string;
export {};
