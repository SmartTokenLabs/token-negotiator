import WalletConnectProvider from "@walletconnect/web3-provider";

export const getWalletConnectProviderInstance = async (checkConnectionOnly?: boolean) => {
	return new WalletConnectProvider({
		infuraId: "7753fa7b79d2469f97c156780fce37ac",
		qrcode: !checkConnectionOnly,
		rpc: {
			137: 'https://polygon-rpc.com/', // Polygon
			56: 'https://bsc-dataseed.binance.org/', // BSC,
			43114: 'https://api.avax.network/ext/bc/C/rpc', // Avalanche
			250: 'https://rpc.fantom.network/', // Fantom
			5: 'https://eth-goerli.g.alchemy.com/v2/yVhq9zPJorAWsw-F87fEabSUl7cCU6z4', // Goerli
			42161: 'https://arb1.arbitrum.io/rpc', // Arbitrum
			80001: 'https://polygon-mumbai.g.alchemy.com/v2/rVI6pOV4irVsrw20cJxc1fxK_1cSeiY0' // mumbai
		}
	});
}