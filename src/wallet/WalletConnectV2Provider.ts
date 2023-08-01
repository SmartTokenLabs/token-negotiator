import UniversalProvider from '@walletconnect/universal-provider'

export const WC_V2_DEFAULT_CHAINS = [
	'eip155:1', // Mainnet
	// 'eip155:5',
	// 'eip155:11155111',
	/*
	'eip155:137', // Polygon
	*/
	// 'eip155:80001',
	// 'eip155:56',
	// 'eip155:97',
	// 'eip155:43114',
	// 'eip155:43113',
	/*
	// disabled al networks except of Mainnet, because we dont make transactions and only have to read address and sign message. In case if multiple networks REQUIRED then Metamask breaks connection without any message
	'eip155:250', // Fantom
	'eip155:25', // Cronos
	'eip155:42161', // Arbitrum
	'eip155:10', // Optimism
	*/
]

export const getWalletConnectV2ProviderInstance = async () => {
	return await UniversalProvider.init({
		projectId: '2ec7ead81da1226703ad789c0b2f7b30',
		logger: 'debug',
		relayUrl: 'wss://relay.walletconnect.com',
	})
}
