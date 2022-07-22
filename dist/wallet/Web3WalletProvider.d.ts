export declare class Web3WalletProvider {
    state: any;
    constructor();
    connectWith(walletType: string): Promise<any>;
    signWith(message: string, walletData: any): Promise<string>;
    getConnectedWalletData(): any;
    registerNewWalletAddress(address: string, chainId: string, provider: any): any;
    MetaMask(): Promise<any>;
    WalletConnect(): Promise<any>;
    Torus(): Promise<any>;
}
export default Web3WalletProvider;
