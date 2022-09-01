import { ethers } from "ethers";
import { SafeConnectOptions } from "./SafeConnectProvider";
import { Client } from "../client";
interface WalletConnectionState {
    [index: string]: WalletConnection;
}
interface WalletConnection {
    address: string;
    chainId: number | string;
    providerType: string;
    blockchain: string;
    provider?: ethers.providers.Web3Provider;
}
export declare class Web3WalletProvider {
    private static LOCAL_STORAGE_KEY;
    connections: WalletConnectionState;
    safeConnectOptions?: SafeConnectOptions;
    client: Client;
    constructor(client: Client, safeConnectOptions?: SafeConnectOptions);
    saveConnections(): void;
    emitSavedConnection(address: string): WalletConnection;
    deleteConnections(): void;
    loadConnections(): Promise<void>;
    connectWith(walletType: string, checkConnectionOnly?: boolean): any;
    signMessage(address: string, message: string): Promise<string>;
    getWalletProvider(address: string): ethers.providers.Web3Provider;
    getConnectedWalletData(): WalletConnection[];
    registerNewWalletAddress(address: string, chainId: number | string, providerType: string, provider: any, blockchain?: string): string;
    private registerProvider;
    MetaMask(checkConnectionOnly: boolean): Promise<string>;
    WalletConnect(checkConnectionOnly: boolean): Promise<unknown>;
    Torus(checkConnectionOnly: boolean): Promise<string>;
    Phantom(): Promise<string>;
    SafeConnect(): Promise<any>;
    safeConnectAvailable(): boolean;
    getSafeConnectProvider(): Promise<import("./SafeConnectProvider").SafeConnectProvider>;
}
export default Web3WalletProvider;
