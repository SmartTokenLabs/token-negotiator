import { Client } from '../index'
import { OnChainTokenConfig, TokenScriptResult } from '../interface'
import { Messaging } from '../../core/messaging'

export interface ChainMapInterface {
	[key: number]: string
}

enum ChainID {
	ETHEREUM = 1,
	POLYGON = 137,
	ARBITRUM = 42161,
	OPTIMISM = 10,
	BSC = 56,
	BSC_TESTNET = 97,
	GOERLI = 5,
	SEPOLIA = 11155111,
	KOVAN = 42,
	MUMBAI = 80001,
	AVALANCH = 43114,
	FANTOM = 250,
	KLAYTN = 8217,
	BAOBAB = 1001,
}

export const CHAIN_MAP: ChainMapInterface = {
	[ChainID.ETHEREUM]: 'eth',
	[ChainID.POLYGON]: 'polygon',
	[ChainID.ARBITRUM]: 'arbitrum',
	[ChainID.OPTIMISM]: 'optimism',
	[ChainID.GOERLI]: 'goerli',
	[ChainID.KOVAN]: 'kovan',
	[ChainID.BSC]: 'bsc',
	[ChainID.MUMBAI]: 'mumbai',
	[ChainID.AVALANCH]: 'avalanche',
	[ChainID.FANTOM]: 'fantom',
	[ChainID.KLAYTN]: 'cypress',
	[ChainID.BAOBAB]: 'baobab',
}

export class ActionHandler {
	constructor(private client: Client) {}

	executeTokenScriptAction(
		issuer: OnChainTokenConfig,
		action: string,
		tokenId?: number | string,
		callbackUri?: string,
	): Promise<void | TokenScriptResult> {
		const config = this.client.config.tokenScript
		const chain = issuer.tokenScript.chain ?? this.getChainIdFromName(issuer.chain)
		const address = issuer.tokenScript.contract ?? issuer.contract

		const params = new URLSearchParams()
		params.set('chain', chain)
		params.set('contract', address)
		params.set('viewType', 'integration')

		const origin = new URL(config.viewerUrl).origin

		if (config.integrationType === 'redirect') {
			if (!callbackUri) callbackUri = document.location.href
			params.set('callbackUri', callbackUri)

			document.location.href = config.viewerUrl + '?' + params.toString() + '#card=' + action
		} else if (config.integrationType === 'iframe') {
			return new Promise((resolve, reject) => {
				const messaging = new Messaging()

				const frame = messaging.createIframe(() => {
					reject(new Error('User aborted'))
				})

				window.addEventListener('message', (evt) => {
					if (origin !== evt.origin) return

					console.log(evt)

					modal.style.display = 'none'
					modal.remove()

					if (evt.data.error) {
						reject(new Error(evt.data.error))
					} else {
						resolve(evt.data)
					}
				})

				frame.src = config.viewerUrl + '?' + params.toString() + '#card=' + action

				const modal = messaging.getModal()
				modal.style.display = 'block'
			})
		} else {
			throw new Error('Integration type ' + config.integrationType + ' is not supported.')
		}
	}

	private getChainIdFromName(chainName) {
		const reverseMapping = (o) => Object.keys(o).reduce((r, k) => Object.assign(r, { [o[k]]: (r[o[k]] || []).concat(k) }), {})

		return reverseMapping(CHAIN_MAP)[chainName]
	}

	/* tokenScriptCallbackHandler(){

	}*/
}
