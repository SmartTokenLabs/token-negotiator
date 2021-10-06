import { SignedDevconTicket } from './../Attestation/SignedDevonTicket.js';
export declare const config: {
    "devcon-ticket": {
        tokenName: string;
        attestationOrigin: string;
        tokenOrigin: string;
        tokenUrlName: string;
        tokenSecretName: string;
        tokenIdName: string;
        unsignedTokenDataName: string;
        tokenParser: typeof SignedDevconTicket;
        localStorageItemName: string;
        localStorageEthKeyItemName: string;
        fabButton: string;
    };
};
