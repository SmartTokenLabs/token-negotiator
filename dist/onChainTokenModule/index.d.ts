import { OnChainTokenConfig } from "../client/interface";
interface OnChainApiConfig {
    [apiName: string]: {
        chainSupport: string[];
        config: {
            [network: string]: {
                url: string;
                apiKey?: string;
            };
        };
    };
}
export interface ContractData {
    api: string;
    chain: string;
    contract: string;
    image?: string;
    title?: string;
    onChain?: boolean;
}
export interface TokenData {
    api: string;
    tokenId: string;
    title?: string;
    image?: string;
    data?: string;
}
export declare class OnChainTokenModule {
    onChainApiConfig: OnChainApiConfig;
    ipfsBaseUrl?: string;
    hasIpfsSchemeSupport: boolean;
    constructor(onChainModuleKeys?: {
        [apiName: string]: string;
    }, ipfsBaseUrl?: string);
    getOnChainAPISupportBool(apiName: string, chain: string): boolean;
    transformImageUrl(url: string): string;
    getInitialContractAddressMetaData(issuer: OnChainTokenConfig): Promise<ContractData | null>;
    getContractDataOpenSea(contractAddress: string, chain: string, openSeaSlug: string): Promise<ContractData | null>;
    getContractDataMoralis(contractAddress: string, chain: string): Promise<ContractData | null>;
    getContractDataAlchemy(contractAddress: string, chain: string): Promise<ContractData | null>;
    connectOnChainToken(issuer: OnChainTokenConfig, owner: string): Promise<any[]>;
    private mergeTokenMetadata;
    validateTokenMetadata(tokens: {
        [tokenId: string]: TokenData;
    }): boolean;
    getTokensOpenSea(address: string, chain: string, owner: string, openSeaSlug: string, offset?: number, limit?: number): Promise<TokenData[]>;
    getTokensMoralis(address: string, chain: string, owner: string, offset?: number, limit?: number): Promise<TokenData[]>;
    getTokensAlchemy(address: string, chain: string, owner: string): Promise<TokenData[]>;
    getDataOpensea(path: string, chain: string): Promise<any>;
    getDataAlchemy(path: string, chain: string): Promise<any>;
    getDataMoralis(path: string, chain: string): Promise<any>;
    private joinUrl;
    private getConfigForServiceAndChain;
    private httpJsonRequest;
    getTokensPOAP(owner: string): Promise<any[]>;
}
export default OnChainTokenModule;
