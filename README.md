
# `token-negotiator`

Open source technology that enables you build web experiences for users around the tokens they hold.

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
negotiator.on("tokens-selected", (tokens) => {
	console.log('owner tokens found: ', tokens);
});
​
```

## Documentation

See https://tokenscript.gitbook.io/token-negotiator/
