
# `token-negotiator`

Token Negotiator is an open source technology that enables you build web experiences for users around the tokens, collectibles, coins and attestations they hold. Enabled across EVM, Solana, Flow, Chiliz and EOS (Ultra). Create logic flows to enable personalized web experiences.

## Usage

```js

import { Client } from "@tokenscript/token-negotiator";
import "@tokenscript/token-negotiator/dist/theme/style.css";
​	​
const negotiator = new Client({
	type: "active",
	issuers: [
		{
			blockchain: "evm",
			onChain: true,
			collectionID: "cool-cats",
			contract: "0x1a92f7381b9f03921564a437210bb9396471050c",
			chain: "eth",
		}
	],
	uiOptions: {
		openingHeading: "Connect your Cool Cats NFT for a VIP experience.",
		issuerHeading: "Get discount with token"
	},
});
​​
negotiator.negotiate();
​	​
negotiator.on("tokens-selected", ({ selectedTokens, selectedIssuerKeys }) => {
	console.log('user selected tokens: ', selectedTokens);
});
​
```

## Documentation

See https://tokenscript.gitbook.io/token-negotiator/
