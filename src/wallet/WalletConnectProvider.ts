import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min'
import { WC_DEFAULT_RPC_MAP } from './WalletConnectV2Provider'

export const getWalletConnectProviderInstance = async (checkConnectionOnly?: boolean) => {
	return new WalletConnectProvider({
		infuraId: '7753fa7b79d2469f97c156780fce37ac',
		qrcode: !checkConnectionOnly,
		rpc: WC_DEFAULT_RPC_MAP,
	})
}
