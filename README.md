
# `token-negotiator`

Token Negotiator provides the gateway for web applications to connect with user tokens, enabling developers to create bespoke tokenised web experiences from both on and off chain sources.

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
			openingHeading: "Connect your NFT to access custom content and more.",
			issuerHeading: "Get discount with token",
			repeatAction: "try again",
			theme: "light",
			position: "bottom-right",
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

## Github

https://github.com/TokenScript/token-negotiator