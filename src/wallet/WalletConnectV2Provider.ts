import UniversalProvider from '@walletconnect/universal-provider'

export const WC_DEFAULT_RPC_MAP = {
	1: 'https://ethereum.publicnode.com', // mainnet
	5: 'https://eth-goerli.g.alchemy.com/v2/yVhq9zPJorAWsw-F87fEabSUl7cCU6z4', // Goerli
	11155111: 'https://sepolia.infura.io/v3/9f79b2f9274344af90b8d4e244b580ef', // Sepolia
	137: 'https://polygon-rpc.com/', // Polygon
	80001: 'https://polygon-mumbai.g.alchemy.com/v2/rVI6pOV4irVsrw20cJxc1fxK_1cSeiY0', // mumbai
	56: 'https://bsc-dataseed.binance.org/', // BSC,
	97: 'https://data-seed-prebsc-1-s1.binance.org:8545', // BSC testnet
	43114: 'https://api.avax.network/ext/bc/C/rpc', // Avalanche
	43113: 'https://api.avax-test.network/ext/bc/C/rpc', // Fuji testnet
	250: 'https://rpc.fantom.network/', // Fantom,
	25: 'https://evm-cronos.crypto.org', // Cronos,
	338: 'https://evm-t3.cronos.org', // Cronos testnet
	42161: 'https://arb1.arbitrum.io/rpc', // Arbitrum
	421613: 'https://arb-goerli.g.alchemy.com/v2/nFrflomLgsQQL5NWjGileAVqIGGxZWce', // Arbitrum goerli,
	10: 'https://mainnet.optimism.io', // Optimism
}

export const WC_V2_DEFAULT_CHAINS = [
	'eip155:1', // Mainnet
	// 'eip155:5',
	// 'eip155:11155111',
	'eip155:137', // Polygon
	// 'eip155:80001',
	// 'eip155:56',
	// 'eip155:97',
	// 'eip155:43114',
	// 'eip155:43113',
	'eip155:250', // Fantom
	'eip155:25', // Cronos
	'eip155:42161', // Arbitrum
	'eip155:10', // Optimism
]

export const getWalletConnectV2ProviderInstance = async () => {
	return await UniversalProvider.init({
		projectId: '2ec7ead81da1226703ad789c0b2f7b30',
		logger: 'debug',
		relayUrl: 'wss://relay.walletconnect.com',
	})
}
