import { EthNetworkConfiguration, Magic } from 'magic-sdk'

export const getMagicProviderInstance = (magicLinkWalletOptions?: {
	apikey?: string
	network?: EthNetworkConfiguration
}) => {
	return new Magic(magicLinkWalletOptions?.apikey ?? 'pk_live_1DC8C5ABF9204C31', {
		network: magicLinkWalletOptions?.network ?? 'goerli',
	})
}
