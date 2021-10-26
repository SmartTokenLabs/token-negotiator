import { KeyPair } from "./libs/KeyPair";
import { Verifiable } from "./libs/Verifiable";
import { TokenValidateable } from "./libs/TokenValidateable";
import { Validateable } from "./libs/Validateable";
declare global {
    interface Window {
        attachEvent: any;
        detachEvent: any;
    }
}
export interface devconToken {
    ticketBlob: string;
    ticketSecret: bigint;
    email?: string;
    magicLink?: string;
    attestationOrigin: string;
}
export declare class Authenticator {
    private negotiator;
    private signedTokenBlob;
    private signedTokenSecret;
    private attestationBlob;
    private attestationSecret;
    private magicLink;
    private email;
    private attestationOrigin;
    private authResultCallback;
    private iframe;
    private iframeWrap;
    private base64senderPublicKey;
    private base64attestorPubKey;
    private webDomain;
    constructor(negotiator?: any);
    getAuthenticationBlob(tokenObj: devconToken, authResultCallback: Function): void;
    getIdentifierAttestation(): void;
    getUseTicket(ticketSecret: bigint, attestationSecret: bigint, base64ticket: string, base64attestation: string, base64attestationPublicKey: string, base64senderPublicKey: string): Promise<string>;
    postMessageAttestationListener(event: MessageEvent): void;
    attachPostMessageListener(listener: Function): void;
    static requestAttest(receiverId: string, type: string, attestorDomain: string, secret: bigint, userKey?: KeyPair): Promise<string | undefined>;
    static constructAttest(attestorKey: KeyPair, issuerName: string, validityInMilliseconds: number, attestRequestJson: string, attestorDomain: string): string;
    static useAttest(attestationBase64: string, attestationSecretBase64: string, attestorKey: KeyPair, receiverId: string, type: string, webDomain: string, sessionKey?: KeyPair, userKey?: KeyPair): Promise<string | undefined>;
    static checkAttestRequestVerifiability(input: Verifiable): void;
    static checkAttestRequestValidity(input: Validateable): void;
    static checkUsageVerifiability(input: Verifiable): void;
    static checkUsageValidity(input: TokenValidateable): void;
    static verifyUsage(jsonRequest: string, attestorKey: KeyPair, message: string, WEB_DOMAIN: string, signature: Uint8Array): Promise<"SUCCESSFULLY validated usage request!" | undefined>;
    static requestAttestAndUsage(userKey: KeyPair, receiverId: string, type: string, ATTESTOR_DOMAIN: string, attestationSecretBase64: string, sessionKey: KeyPair): Promise<string | undefined>;
}
