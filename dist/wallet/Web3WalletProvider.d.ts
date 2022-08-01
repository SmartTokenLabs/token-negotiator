import { SafeConnectOptions } from "./SafeConnectProvider";
import { Client } from "../client";
export declare class Web3WalletProvider {
    state: any;
    safeConnectOptions?: SafeConnectOptions;
    client: Client;
    constructor(client: Client, safeConnectOptions?: SafeConnectOptions);
    connectWith(walletType: string): Promise<any>;
    signWith(message: string, walletProvider: any): Promise<string>;
    getConnectedWalletData(): any;
    registerNewWalletAddress(address: string, chainId: string, provider: any, blockChain?: string): any;
    MetaMask(): Promise<any>;
    WalletConnect(): Promise<any>;
    Torus(): Promise<any>;
    Phantom(): Promise<any>;
    SafeConnect(): Promise<any>;
    safeConnectAvailable(): boolean;
    getSafeConnectProvider(): Promise<import("./SafeConnectProvider").SafeConnectProvider>;
}
export default Web3WalletProvider;
