export interface UNInterface {
    expiration: number;
    domain: string;
    randomness: string;
    UN: string;
    messageToSign: string;
    address?: string;
    signature?: string;
}
export declare class UN {
    static getNewUN(endPoint: string): Promise<UNInterface>;
    static recoverAddress(un: UNInterface): string;
    static validateChallenge(endPoint: string, data: UNInterface): Promise<any>;
}
