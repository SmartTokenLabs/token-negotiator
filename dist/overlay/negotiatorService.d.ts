declare class NegotiatorService {
    getTokens: ({ filter, tokenName, tokensOrigin, localStorageItemName, tokenParser, unsignedTokenDataName }: {
        filter?: {};
        tokenName?: string;
        tokensOrigin?: string;
        localStorageItemName?: string;
        tokenParser: any;
        unsignedTokenDataName: string;
    }) => Promise<unknown>;
    createOverlayMarkup: () => string;
    createToken: (data: any, index: any, tokenImage: string) => string;
    createFabButton: (buttonURL: string) => string;
    config: any;
    selectedTokenState: any[];
    tokenParser: string;
    filter: {};
    options: {};
    overlayClickTimer: any;
    constructor();
    set configuration({ filter, tokenName, options }: {
        filter: any;
        tokenName: any;
        options: any;
    });
    get selectedTokens(): any[];
    set selectedTokens(tokens: any[]);
    eventReciever: (dataObject: any) => void;
    eventSender: {
        emitTokenButtonHTML: () => void;
        emitSelectedTokens: () => void;
        overlayClickTimer: null;
        emitOverlayToggleState: () => void;
    };
    closeOverlay: () => void;
    showOverlay: () => void;
    overlayClickHandler: () => "open" | "close";
    addTokens: (tokens: any) => void;
    addToken: (tokenContainer: any, str: string) => void;
}
export default NegotiatorService;
