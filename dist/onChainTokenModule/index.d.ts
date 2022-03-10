export declare class OnChainTokenModule {
    constructor();
    getOnChainAPISupportBool(apiName: any, chain: any): boolean;
    getInitialContractAddressMetaData(issuerKey: string): Promise<unknown>;
    getContractDataOpenSea(contractAddress: string, chain: string, openSeaSlug: string): Promise<void | {
        chain: string;
        contractAddress: string;
        emblem: any;
        title: any;
    }>;
    getContractDataMoralis(contractAddress: string, chain: string): Promise<void | {
        chain: string;
        contractAddress: string;
        emblem: any;
        title: any;
    }>;
    getContractDataAlchemy(contractAddress: string, chain: string): Promise<unknown>;
    connectOnChainToken(issuerKey: string, owner: string): Promise<any>;
    getTokensOpenSea(address: string, chain: string, owner: string, openSeaSlug: string, offset?: number, limit?: number): Promise<any>;
    getTokensMoralis(address: string, chain: string, owner: string, offset?: number, limit?: number): Promise<any>;
    getTokensAlchemy(address: string, chain: string, owner: string): Promise<unknown>;
}
export default OnChainTokenModule;
