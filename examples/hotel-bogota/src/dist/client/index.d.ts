export declare class Client {
    constructor(filter: {} | undefined, tokenName: any, options?: {});
    negotiate(): Promise<unknown>;
    negotiateViaOverlay(): void;
    connectMetamaskAndGetAddress(): Promise<any>;
    signMessageWithBrowserWallet(message: any): Promise<string>;
    authenticate({ unsignedToken, unEndPoint }: {
        unsignedToken: any;
        unEndPoint: any;
    }): Promise<unknown>;
    validateUseEthKey(endPoint: any, data: any): Promise<any>;
    getUnpredictableNumber(endPoint: any): Promise<any>;
    ethKeyIsValid(ethKey: any): boolean;
    getChallengeSigned(unEndPoint: any): Promise<any>;
    signNewChallenge(unEndPoint: any): Promise<{
        address: string;
        expiry: any;
        domain: any;
        randomness: any;
        signature: string;
        UN: any;
    }>;
}
