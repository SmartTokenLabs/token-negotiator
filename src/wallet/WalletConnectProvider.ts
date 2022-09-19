import WalletConnectProvider from "@walletconnect/web3-provider";

export const getWalletConnectProviderInstance = async (checkConnectionOnly?: boolean) => {
  return new WalletConnectProvider({ infuraId: "7753fa7b79d2469f97c156780fce37ac", qrcode: !checkConnectionOnly });
}