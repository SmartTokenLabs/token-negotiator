import { KeyPair } from "./KeyPair";
export interface Eip712DomainInterface {
    name: string;
    version: string;
    chainId?: number;
    verifyingContract?: string;
    salt?: string;
}
export declare class SignatureUtility {
    static OID_ECDSA_PUBLICKEY: string;
    static Eip712Data: {
        [index: string]: string;
    };
    static Eip712domainTypes: {
        name: string;
        type: string;
    }[];
    static sign(str: string, keys: KeyPair): string;
    static verify(str: string, signature: string, keys: KeyPair): boolean;
    static verifyArrayBuf(arr: ArrayBuffer | Uint8Array | number[], signature: string, keys: KeyPair): boolean;
    static signMessageWithBrowserWallet(message: string): Promise<string>;
    static recoverPublicKeyFromMessageSignature(message: string, signature: string): Promise<string>;
    static recoverPublicKeyFromTypedMessageSignature(messageObj: any, signature: string): string;
    static signEIP712WithBrowserWallet(webDomain: string, userDataValues: {
        [index: string]: string | number;
    }, userDataTypes: Array<{
        name: string;
        type: string;
    }>, primaryName: string, userKey?: KeyPair): Promise<string>;
    static connectMetamaskAndGetAddress(): Promise<string>;
    static getChainIdFromSignature(signature: string): number;
}
