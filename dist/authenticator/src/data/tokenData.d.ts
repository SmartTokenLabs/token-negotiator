import { SignedDevconTicket } from "../asn1/shemas/SignedDevconTicket";
export declare const XMLconfigData: {
    attestationOrigin: string;
    tokensOrigin: string;
    tokenUrlName: string;
    tokenSecretName: string;
    unsignedTokenDataName: string;
    tokenParser: typeof SignedDevconTicket;
    localStorageItemName: string;
    base64senderPublicKey: string;
    base64attestorPubKey: string;
    webDomain: string;
};
