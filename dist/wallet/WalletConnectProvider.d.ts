import WalletConnectProvider from "@walletconnect/web3-provider";
import UniversalProvider from "@walletconnect/universal-provider";
export declare const CUSTOM_RPCS_FOR_WC_V2: {
    1: string;
    137: string;
    56: string;
    43114: string;
    250: string;
    25: string;
    42161: string;
    10: string;
};
export declare const WC_V2_CHAINS: string[];
export declare const getWalletConnectProviderInstance: (checkConnectionOnly?: boolean) => Promise<WalletConnectProvider>;
export declare const getWalletConnectUniversalProviderInstance: () => Promise<UniversalProvider>;
