export declare class OnChainTokenModule {
    constructor();
    getOnChainAPISupportBool(apiName: any, chain: any): boolean;
    getInitialContractAddressMetaData(issuer: any): Promise<unknown>;
    getContractDataOpenSea(contractAddress: string, chain: string, openSeaSlug: string): Promise<void | {
        chain: string;
        contractAddress: string;
        image: any;
        title: any;
    }>;
    getContractDataMoralis(contractAddress: string, chain: string): Promise<void | {
        api: string;
        chain: string;
        contractAddress: string;
        image: any;
        title: any;
    }>;
    getContractDataAlchemy(contractAddress: string, chain: string): Promise<unknown>;
    connectOnChainToken(issuer: string, owner: string): Promise<any>;
    getTokensOpenSea(address: string, chain: string, owner: string, openSeaSlug: string, offset?: number, limit?: number): Promise<any>;
    getTokensMoralis(address: string, chain: string, owner: string, offset?: number, limit?: number): Promise<any>;
    getTokensAlchemy(address: string, chain: string, owner: string): Promise<unknown>;
    getTokensPOAP(owner: string): Promise<{
        title: any;
        image: any;
        data: any;
    }[]>;
}
export default OnChainTokenModule;
