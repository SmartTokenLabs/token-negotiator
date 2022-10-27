// @ts-nocheck
import { SelectIssuers } from "../views/select-issuers";
import { Client } from "../index";

describe('select issuers spec', () => {

	function getOnChainConfigClient() {
		return new Client({
			type: "active",
			issuers: [
				{ onChain:true, collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' },
				{ onChain:true, collectionID: "mayc", contract: '0x2F6F12b68165aBb483484927919D0d3fE450462E', chain: 'rinkeby' }
			],
			options: {}
		});
	}
  
	function getOnChainSolanaConfigClient() {
		return new Client({
			type: "active",
			issuers: [
				{ collectionID: "penthouse-panther-club", collectionAddress: "ff846ef2eed57e5367cf8826e63f4d53fe28d28aa67417accb6e4b48cbd19136", onChain: true, symbol: "PPC", chain: "mainnet", blockchain: "solana" }
			],
			options: {}
		});
	}

	test('selectIssuers render issuers', () => {
		console.log("Select issuers test")
		const client = getOnChainConfigClient()
		const selectIssuers = new SelectIssuers(client, client.getUi(), "<div></div>", "options" )

		const title = "title"
		const image = "image"
		const issuer = "issuer"
		const tokens = ["1", "2"]
		selectIssuers.issuerConnectMarkup(title, image, issuer, tokens)
	});
})