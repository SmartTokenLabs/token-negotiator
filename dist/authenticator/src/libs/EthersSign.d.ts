export declare class EthersSign {
    constructor();
    static signMessage(message: string): Promise<string>;
    static signEip712(obj: any): Promise<string>;
}
