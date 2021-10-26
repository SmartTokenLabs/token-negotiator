declare class OutletService {
    constructor(config: any);
    eventReciever: (data: any) => void;
    eventSender: {
        emitTokens: (tokens: any) => void;
        emitTokenProof: (tokenProof: any) => void;
    };
    rawTokenCheck(unsignedToken: any, localStorageItemName: any, tokenParser: any): boolean;
    getRawToken(unsignedToken: any, localStorageItemName: any, tokenParser: any): {} | null | undefined;
}
export default OutletService;
