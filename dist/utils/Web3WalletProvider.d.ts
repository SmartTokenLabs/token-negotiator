declare class Web3WalletProvider {
    state: any;
    registeredWalletProviders: any;
    networks: any;
    constructor();
    connectWith(walletType: string): Promise<any>;
    signWith(message: string, walletData: any): Promise<string>;
    getConnectedWalletData(): any;
    registerNewWalletAddress(address: string, chainId: string, provider: any): any;
    getWeb3ChainId(web3: any): Promise<any>;
    getWeb3Accounts(web3: any): Promise<any>;
    getWeb3ChainIdAndAccounts(web3: any): Promise<{
        chainId: any;
        accounts: any;
    }>;
    MetaMask(): Promise<any>;
    WalletConnect(): Promise<unknown>;
    Torus(): Promise<any>;
}
export default Web3WalletProvider;
