import { KeyPair } from "./libs/KeyPair";
import { AttestableObject } from "./libs/AttestableObject";
import { Attestable } from "./libs/Attestable";
export declare class Ticket extends AttestableObject implements Attestable {
    private ticketId;
    private ticketClass;
    private devconId;
    private magicLinkURLPrefix;
    private signature;
    private keys;
    constructor();
    fromData(devconId: string, ticketId: bigint, ticketClass: number, keys: KeyPair): void;
    createWithCommitment(devconId: string, ticketId: bigint, ticketClass: number, commitment: Uint8Array, signature: string, keys: KeyPair): void;
    static createWithMail(mail: string, devconId: string, ticketId: bigint, ticketClass: number, keys: KeyPair, secret: bigint): Ticket;
    private makeTicket;
    encodeSignedTicket(ticket: string): string;
    getDerEncodingWithPK(): string;
    getDerEncoding(): string;
    verify(): boolean;
    checkValidity(): boolean;
    getTicketId(): bigint;
    getTicketClass(): number;
    getSignature(): string;
    static fromBase64(base64str: string, keys: KeyPair): Ticket;
    fromBytes(bytes: Uint8Array, keys: KeyPair): void;
    getCommitment(): Uint8Array;
    getUrlEncoding(): void;
}
