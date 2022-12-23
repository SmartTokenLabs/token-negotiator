import WalletConnectProvider from "@walletconnect/web3-provider";

export const getWalletConnectProviderInstance = async (checkConnectionOnly?: boolean) => {
	return new WalletConnectProvider({
		infuraId: "7753fa7b79d2469f97c156780fce37ac",
		qrcode: !checkConnectionOnly,
		rpc: {
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
			338: 'https://evm-t3.cronos.org', // Cronos testnet(Rinkeby)
			42161: 'https://arb1.arbitrum.io/rpc', // Arbitrum
			421613: 'https://arb-goerli.g.alchemy.com/v2/nFrflomLgsQQL5NWjGileAVqIGGxZWce', // Arbitrum goerli,
			10: 'https://mainnet.optimism.io'
		}
	});
}