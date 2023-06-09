# token-negotiator

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftokenscript%2Ftoken-negotiator%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/tokenscript/token-negotiator/goto?ref=main)

The Token Negotiator is an open source tool designed towards building the tokenised web. Where new types of experience can be created based around the ownership and use of tokens.

The following types of tokens are supported:

- Cryptographically created Tokens (Off Chain developed with TokenScript)

- Non-Fungible tokens

- Fungible tokens (ERC20)

(for new token issuers who are interested in using TokenScript please visit the following WIKI page: https://github.com/TokenScript/token-negotiator/wiki/Token-Issuer-Page).

### Supported Blockchains and Networks:

<table>
  <thead>
    <tr>
      <th>Blockchain</th>
      <th>Chain</th>
      <th>is testnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>evm</td>
      <td>eth or mainnet</td>
      <td>N</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>polygon</td>
      <td>N</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>optimism</td>
      <td>N</td>
    </tr>
    <tr>
    <td>evm</td>
      <td>bsc</td>
      <td>N</td>
    </tr>
    <td>evm</td>
      <td>bsc testnet</td>
      <td>Y</td>
    </tr>
    <tr>
	    <td>evm</td>
      <td>avalanche</td>
      <td>N</td>
    </tr>
    <tr>
	    <td>evm</td>
      <td>fantom</td>
      <td>N</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>goerli</td>
      <td>Y</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>mumbai</td>
      <td>Y</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>arbitrum</td>
      <td>N</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>cronos</td>
      <td>N</td>
    </tr>
    <tr>
	  <td>solana</td>
      <td>mainnet</td>
      <td>N</td>
    </tr>
    <tr>
	    <td>solana</td>
      <td>devnet</td>
      <td>Y</td>
    </tr>
    <tr>
	    <td>flow</td>
      <td>mainnet</td>
      <td>Y</td>
    </tr>
  </tbody>
</table>

### Wallet Support

<table>
  <thead>
    <tr>
      <th>Chain</th>
      <th>Wallet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>evm</td>
      <td>AlphaWallet</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>MetaMask
			</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>Torus</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>Wallet Connect</td>
    </tr>
    <tr>
      <td>evm</td>
      <td>Wallet Connect V2</td>
    </tr>
    <tr>
      <td>solana</td>
      <td>Phantom</td>
    </tr>
    <tr>
      <td>flow</td>
      <td>Blockto</td>
    </tr>
    <tr>
      <td>flow</td>
      <td>Lillico</td>
    </tr>
    <tr>
      <td>flow</td>
      <td>NuFi</td>
    </tr>
    <tr>
      <td>flow</td>
      <td>Flipper</td>
    </tr>
  </tbody>
</table>

### Getting Started

Using NPM

```sh
  npm i @tokenscript/token-negotiator
```

Or Browser

```html
<script
	type="text/javascript"
	src="https://tokenscript.github.io/token-negotiator/negotiator.js"
></script>
<link
	rel="stylesheet"
	href="https://tokenscript.github.io/token-negotiator/theme/style.css"
/>
```

## Read Tokens from within a website.

This library provides two ways to load tokens into your application, active (with UI) or passive (No UI / Custom).

### Active Negotiation of tokens

<img src="https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/tn-example.png" alt="token negotiator component" style="width:280px;"/>

Include the following html element into your page, this is where the token negotiator overlay widget will be embedded into the page.

```html
<div class="overlay-tn"></div>
```

Add the library and styles for the UI component.

```javascript
import { Client } from "@tokenscript/token-negotiator";
import "@tokenscript/token-negotiator/dist/theme/style.css";
```

This code example configures the Token Negotiator to connect with the expansion punks non-fungible collection. If the end user has tokens inside this collection, the event hook 'tokens-selected' will be triggered.

```javascript
import { Client } from "@tokenscript/token-negotiator";

const filter = {};

let tokens = [];

// configure
const negotiator = new Client({
	type: "active",
	issuers: [
		{
			blockchain: "evm",
			onChain: true,
			collectionID: "expansion-punks",
			contract: "0x0d0167a823c6619d430b1a96ad85b888bcf97c37",
			chain: "eth",
		},
		{ // Example fungible token 
			contract: "0x107065a122f92636a1358a70a0efe0f1a080a7e5",
			onChain: true,
			fungible: true,
			collectionID: "USX",
			chain: "matic",
		},
	],
	uiOptions: {
		openingHeading: "Open a new world of perks, benefits and opportunities with your attestation, collectible or token.",
		issuerHeading: "Get discount with Ticket",
		repeatAction: "try again",
		theme: "light",
		position: "bottom-right",
	},
});

// invoke

negotiator.negotiate();

// event hooks

negotiator.on("tokens-selected", (tokens) => {
	// use tokens
});

negotiator.on("tokens-loaded", (data) => {
	// use the collections information which were loaded
})

negotiator.on("token-proof", (proof) => {
	// use proof
});
```

### Passive Negotiation of tokens

Passive mode can be used when the UI is not needed, or you wish to build your own utilising the hooks available.

```javascript
import { Client } from "@tokenscript/token-negotiator";

const negotiator = new Client({
	type: "passive",
	issuers: [
		{
			blockchain: "evm",
			collectionID: "expansion-punks",
			contract: "0x0d0167a823c6619d430b1a96ad85b888bcf97c37",
			chain: "eth",
		},
		{ // Example fungible token 
			contract: "0x107065a122f92636a1358a70a0efe0f1a080a7e5",
			onChain: true,
			fungible: true,
			collectionID: "USX",
			chain: "matic",
		}
	]
});

negotiator.on("tokens", (issuerTokens) => {
	// use tokens
});

negotiator.on("tokens-loaded", (data) => {
	// use the collections information which were loaded
})

negotiator.on("token-proof", (tokenProof) => {
	// use proof
});

// invoke

negotiator.negotiate();
```

### Managing Issuers on chain (EVM)

```javascript
/**
 * @param {String} blockchain string of which blockchain is needed (optional input: default is 'evm')
 * @param {Boolean} onChain boolean if this token is on / off chain
 * @param {String} collectionID your own reference key to identify the collection by.
 * @param {String} contract smart contract address
 * @param {String} chain smart contract address chain
 * @param {String} openSeaSlug (optional) add collection uri name if the collection features on Opensea
 */
const onChainIssuer = {
	blockchain: "evm",
	onChain: true,
	collectionID: "expansion-punks",
	contract: "0x0d0167a823c6619d430b1a96ad85b888bcf97c37",
	chain: "eth",
	openSeaSlug: "expansion-punks",
};
```

### Managing Issuers on chain (Solana)
:warning: You must supply a certified collectionAddress OR a combination of symbol and either ownerProgram or updateAuthority.
```javascript
/**
 * @param {String} blockchain string of which blockchain is needed (optional input: default is 'evm')
 * @param {Boolean} onChain boolean if this token is on / off chain
 * @param {String} collectionID your own reference key to identify the collection by.
 * @param {String} collectionAddress collection identifier
 * @param {String} chain smart contract address chain
 * @param {String} tokenProgram program address (also described as Owner Program)
 * @param {String} symbol smart contract collection symbol
 * @param {String} updateAuthority user authority to upgrade the collection
 */

const onChainIssuer = {
	onChain: true,
	blockchain: "solana",
	collectionID: "crytpo-cowboys",
	collectionAddress: "0x0d0167a823c6619d430b1a96ad85b888bcf97c37",
	chain: "mainnet",
	tokenProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
	symbol: "CCC",
	updateAuthority: "CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ",
};
```

### Managing Issuers on chain (Flow)

```javascript
/**
 * @param {String} blockchain string of which blockchain is needed (optional input: default is 'evm')
 * @param {Boolean} onChain boolean if this token is on / off chain
 * @param {String} collectionID your own reference key to identify the collection by.
 * @param {String} collectionAddress collection identifier
 * @param {String} chain smart contract address chain
 */

const onChainIssuer = {
	collectionID: "TopShot",
	onChain: true,
	contract: "A.0b2a3299cc857e29.TopShot",
	chain: "mainnet",
	blockchain: "flow",
};
```

### Managing Issuers off chain

```javascript
/**
 * @param {String} collectionID your own reference key to identify the collection by.
 * @param {String} title the token collection config uri
 * @param {Boolean} onChain boolean if this token is on / off chain
 * @param {String} tokenOrigin URL to token attestations
 * @param {String} attestationOrigin attestation server
 * @param {String} unEndPoint unpredictable number generator
 * @param {String} image image for collection
 * @param {String} base64senderPublicKey attestation public key
 * @param {String} base64attestorPubKey attestation public key
 *
 */
const offChainIssuer = {
	collectionID: "devcon",
	onChain: false,
	title: "Devcon",
	image:
		"https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg",
	tokenOrigin: "http://localhost:3002/",
	attestationOrigin: "https://stage.attestation.id/",
	unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
	base64senderPublicKeys: {
		AttestationDAO: "MFYwEAYHKoZIzj0CAQYFK...",
	},
	base64attestorPubKey:
		"MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=",
};
```

### Utilising event hooks

Hooks can be used to capture events triggered within the library.

<br/>

```javascript
// example use of an event hook
negotiator.on("tokens-selected", callback);
```

<br/>

<table>
  <thead>
    <tr>
      <th>Hook Type</th>
      <th>Returns</th>
    </tr>
  </thead>
  <tbody>
		<tr>
			<td>'tokens-selected'</td>
			<td>Tokens selected data</td>
		</tr>
		<tr>
			<td>'tokens'</td>
			<td>Tokens when using passive mode (auto selected)</td>
		</tr>
		<tr>
			<td>'tokens-loaded'</td>
			<td>Collections information(the count) which were loaded</td>
		</tr>
		<tr>
			<td>'network-change'</td>
			<td>Chain</td>
		</tr>
				<tr>
			<td>'token-proof'</td>
			<td>Proof data</td>
		</tr>
		<tr>
			<td>'connected-wallet'</td>
			<td>Wallet data</td>
		</tr>
		<tr>
			<td>'error'</td>
			<td>Error data</td>
		</tr>
		<tr>
			<td>'view-changed'</td>
			<td>(No data returned)</td>
		</tr>
		<tr>
			<td>'tokens-refreshed'</td>
			<td>(No data returned)</td>
		</tr>
		<tr>
			<td>'opened-overlay'</td>
			<td>(No data returned)</td>
		</tr>
		<tr>
			<td>'closed-overlay'</td>
			<td>(No data returned)</td>
		</tr>
		<tr>
			<td>'loaded'</td>
			<td>(No data returned)</td>
		</tr>
		<tr>
			<td>'disconnected-wallet'</td>
			<td>(No data returned)</td>
		</tr>
  </tbody>
</table>

### Authenticate ownership of off chain Token

Authenticating ownership of the token will provide a proof with a limited expiry.

```javascript
/**
 * @param {String} issuer token issuer
 * @param {Object} unsignedToken token to attest
 */
negotiator.authenticate({
	issuer,
	unsignedToken,
});

negotiator.on("proof", () => {
	// the proof will be received here (valid or failed)
});
```

### Update component theme

Changing the theme.

```javascript
/**
 * @param {String} theme 'light' || 'dark'
 */
negotiator.switchTheme("dark");
```

### Tokens Updated Hook

Changing the theme.

```javascript

// temporary solution likely to change in the next major release version.
document.body.addEventListener("tokensupdated", () => {
	console.log("Tokens updated event fired!!");
});

```

### When working without NPM

For projects where you are not using a Node.js work flow. Or would prefer to inject the library into the html (polyfills included).

Configure the library using the following example.

```html
<script
	type="text/javascript"
	src="https://tokenscript.github.io/token-negotiator/negotiator.js"
></script>
<link
	rel="stylesheet"
	href="https://tokenscript.github.io/token-negotiator/theme/style.css"
/>

<body onload="init()">
	<div class="overlay-tn"></div>

	<script>
		function init() {
			window.negotiator = new negotiator.Client({
				type: "active",
				issuers: [
					{
						onChain: true,
						collectionID: "tt",
						contract: "0x76be3b62873462d2142405439777e971754e8e77",
						chain: "eth",
						blockchain: "evm",
					},
					{
						hideToggle: true,
						noTokenMsg:
							"<p>If you have a token please:</p><p>1. Open your magic link inside this browser.2. Refresh this page.</p>",
						onChain: true,
						collectionID: "bsc-collection-test",
						contract: "0xF5db804101d8600c26598A1Ba465166c33CdAA4b",
						chain: "bsc",
						blockchain: "evm",
					},
					{
						onChain: true,
						collectionID: "Perion",
						contract: "0x96af92ae2d822a0f191455ceca4d4e7ee227668e",
						chain: "mumbai",
						blockchain: "evm",
					},
				],
				uiOptions: {
					openingHeading:
						"Open a new world of perks, benefits and opportunities with your attestation, collectible or token.",
					issuerHeading: "Get discount with Ticket",
					repeatAction: "try again",
					theme: "light",
					position: "bottom-right",
				},
			});

			window.negotiator.on("tokens-selected", (tokens) => {
				console.log(tokens);
			});

			window.negotiator.on("token-proof", (proof) => {
				console.log(proof);
			});

			window.negotiator.negotiate();
		}
	</script>
</body>
```

## filters

Key values applied to all tokens. Use if you only wish for users to use a certain subclass of tokens.

```javascript
const issuer = {
	onChain: false,
	collectionID: "devcon",
	filter: { class: "7" },
};
```

## Token Issuers

```javascript
import { client, outlet } from "@tokenscript/token-negotiator";
```

For off chain token issuers, there is an additional module within the Token Negotiator named { outlet } used to safely store, decode and dispatch token meta data to the client module (in page or cross origin).

A mock token implementation can be found here: https://github.com/TokenScript/token-negotiator-examples/tree/main/token-outlet-website/src

For any further information, please reach out to us at <sayhi@smarttokenlabs.com>

## Configuration Options

This table lists all possible configuration options for Token Negotiator client.

| Property Name                          | Description                                                                                                                                                                                                                                                    | Required | Type                                          | Default                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------- | ---------------------------------------- |
| type                                   | The negotiation type, either active or passive                                                                                                                                                                                                                 | Y        | string                                        |                                          |
| issuers                                | An array of issuer configurations. This can be left empty and provided dynamically when calling negotiate.                                                                                                                                                     | N        | OnChainTokenConfig[] or OffChainTokenConfig[] |                                          |
| **uiOptions**                          | An object defining UI specific options                                                                                                                                                                                                                         | N        | UIOptionsInterface                            |                                          |
| uiOptions.uiType                       | The type of UI that should be used for active negotiation type.                                                                                                                                                                                                | N        | "popup" or "inline"                           | popup                                    |
| uiOptions.containerElement             | The query selector of the element that should contain the negotiator UI                                                                                                                                                                                        | N        | string                                        | .overlay-tn                              |
| uiOptions.openingHeading               | Custom text to display on the start page                                                                                                                                                                                                                       | N        | string                                        | Open a new world of perks, benefits and opportunities with your attestation, collectible or token. |
| uiOptions.issuerHeading                | Custom heading to display on the issuer list                                                                                                                                                                                                                   | N        | string                                        | Detected tokens                          |
| uiOptions.repeatAction                 | (Deprecated) Text for retry actions                                                                                                                                                                                                                            | N        | string                                        |                                          |
| uiOptions.theme                        | The theme to use for the UI                                                                                                                                                                                                                                    | N        | "light" or "dark"                             | light                                    |
| uiOptions.position                     | (Not implemented) The position of the popup                                                                                                                                                                                                                    | N        | string                                        | bottom-left                              |
| uiOptions.autoPopup                    | When calling negotiate, this option makes the popup UI open automatically when user input is required, or when new tokens are loading.                                                                                                                         | N        | boolean                                       | true                                     |
| uiOptions.viewOverrides                | Enables customisation OR an entire replacement of the built-in views. See the "Customising Views" section below.                                                                                                                                               |          |                                               |                                          |
| autoLoadTokens                         | Automatically load tokens once the user connects their wallet in active type negotiation. This can be set to true to load tokens for all issuers, or a number to limit the tokens loaded. If this is set to false the user must load each issuer individually. | N        | boolean or number                             | true                                     |
| autoEnableTokens                       | This option causes all tokens to become selected and available to the website when loaded. If this option is set to false, tokens must be selected manually by the user.                                                                                       | N        | boolean                                       | true                                     |
| messagingForceTab                      | Whether to use a tab rather than an iframe for communication with off-chain ticket issuers.                                                                                                                                                                    | N        | boolean                                       | false                                    |
| **safeConnectOptions**                 | (Experimental) Options for STL product integration                                                                                                                                                                                                             | N        | SafeConnectOptions                            |                                          |
| **unSupportedUserAgent**               | (Temporary) Options to define browsers that are unsupported or blocked in negotiator                                                                                                                                                                           | N        |                                               |                                          |
| unSupportedUserAgent.type.config       | Browsers that are unsupported.                                                                                                                                                                                                                                 | Y        | BrowserDataInterface                          |                                          |
| unSupportedUserAgent.type.errorMessage | Error message to show for unsupported browsers.                                                                                                                                                                                                                | Y        | string                                        |                                          |

## Issuer Configurations

### On Chain

| Property Name     | Description                                                                                                                                                                                                | On/Off Chain | Required | Type    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ------- |
| blockchain        | The blockchain technology the token issuer has published the tokens with ("evm" or "solana". When undefined, this option will default to "evm")                                                            | Both         | N        | string  |
| collectionID      | A unique ID for the token issuer. This is used as a reference key for you as a developer to use, where when the end user selected tokens you can identify them with this unique key e.g. "my-demo-tokens". | Both         | Y        | string  |
| onChain           | Whether this is an on or off-chain token (defaults to true)                                                                                                                                                | Both         | N        | boolean |
| title             | Collection title: loaded from API if not specified                                                                                                                                                         | Both         | Y        |
| OffChain          | string                                                                                                                                                                                                     |
| image             | Collection image URL: loaded from API if not specified                                                                                                                                                     | Both         | OffChain | string  |
| contract          | Ethereum contract address for the collection                                                                                                                                                               | OnChain      | Y        | string  |
| collectionAddress | Solana contract address for the collection (required when using Solana tokens)                                                                                                                             | OnChain      | Y        | string  |
| tokenProgram      | Solana token program for the collection (required when using Solana tokens)                                                                                                                                | OnChain      | Y        | string  |
| updateAuthority   | Solana update authority for the collection (required when using Solana tokens)                                                                                                                             | OnChain      | Y        | string  |
| symbol            | Solana symbol for the collection (required when using Solana tokens)                                                                                                                                       | OnChain      | Y        | string  |
| chain             | Chain for the collection                                                                                                                                                                                   | OnChain      | Y        | string  |
| openSeaSlug       | The collection name for OpenSea listing. Improves performance for token fetching.                                                                                                                          | OnChain      | N        | string  |
| noTokenMsg        | A token issuer message to assist users when they have no tokens                                                                                                                                            | both         | N        | string  |
| hideToggle        | Hide the Toggle Buttons for the collection                                                                                                                                                                 | both         | N        | boolean |
| fungible | For fungible tokens (defaults to false)                      | Both    | N        | boolean |
### Off Chain

| Property Name              | Description                                                                    | On/Off Chain | Required | Type    |
| -------------------------- | ------------------------------------------------------------------------------ | ------------ | -------- | ------- |
| onChain                    | Whether this is an on or off-chain token (defaults to true)                    | Both         | N        | boolean |
| title                      | Collection title: loaded from API if not specified                             | Both         | Y        | string  |
| image                      | Collection image URL: loaded from API if not specified                         | Both         | N        | string  |
| filters                    | Filters for off-chain token properties                                         | OffChain     | N        | object  |
| tokenOrigin                | The origin URL for off-chain tokens                                            | OffChain     | Y        | string  |
| unEndPoint                 | URL for the unpredictable number service                                       | OffChain     | Y        | string  |
| base64senderPublicKeys     | An array of base64 encoded ticket issuer public keys, indexed by conference ID | OffChain     | Y        | object  |
| base64attestorPubKey       | The base64 encoded public key of the identity attestation issuer               | OffChain     | Y        | string  |
| noTokenMsg                 | A token issuer message to assist users when they have no tokens                | both         | N        | string  |
| hideToggle                 | Hide the Toggle Buttons for the collection                                     | both         | N        | boolean |
| enableOffChainRedirectMode | redirect to connect off chain tokens (default is true)                         | off chain    | N        | boolean |

### Outlet Configuration

(Applicable to TokenScript off chain token issuers)

| Property Name          | Description                                                                        | Required | Type           |
| ---------------------- | ---------------------------------------------------------------------------------- | -------- | -------------- |
| collectionID           | A unique ID for the token issuer. This should match the issuer config collectionID | Y        | string         |
| attestationOrigin      | The attestation origin URL for the off-chain token                                 | Y        | string         |
| tokenParser            | A custom token parser used for decoding attestations                               | N        | decoding class |
| base64senderPublicKeys | An array of base64 encoded ticket issuer public keys, indexed by conference ID     | Y        | object         |
| base64attestorPubKey   | The base64 encoded public key of the identity attestation issuer                   | Y        | string         |

## Customising UI Views

Negotiator UI consists of 3 main screens - start, wallet & main. 
The uiOptions.viewOverrides preference allows extending or completely replacing these views with your own implementation. 
It also allows specifying new views that can be referenced & displayed from your other custom views.
i.e. `this.ui.updateUI('my_custom_view', data, viewOptions);`

Custom views must implement ViewInterface, but we recommend that you extend the AbstractView class for simplicity.
These interfaces & classes can be found in src/client/views/view-interface.ts.

The configuration allows setting a custom view implementation OR options for an existing view
```typescript
viewOverrides?: {
    [type: string]: {
        component?: ViewComponent
        options?: { [key: string]: any }
    }
}
```

A custom view can be a class reference that is constructed within negotiator (and implements ViewConstructor), 
or it can be a factory method that returns an already constructed object that implements ViewInterface.
A factory method allows you to inject extra variables or objects that you want to interact with within the view.

```typescript
import {AbstractView} from "./view-interface";
import {Start} from "./start";

class MyStartView extends Start {
	renderMainTemplate() {
		return `
			/* Changes to main start screen HTML template here */
			<p>${this.params.viewOptions.myCustomOption}</p>
		`
	}
}

class MyCustomView extends AbstractView {
	
	constructor(client: Client, popup: Ui, viewContainer: HTMLElement, params: any, private someOtherObjectINeed: any) {
		super(client, popup, viewContainer, params);
	}
	
	public render(){
		/* Render function (renders HTML into this.viewContainer, starts background processes & attaches nessesary event listeners) */
    }
}

const config = {
	/* ...other config options... */
	uiOptions: {
		viewOverrides: {
			"start": {
				component: MyStartView // Constructor Method
			},
			"my_custom_view": {
				component: (client: Client, popup: Ui, viewContainer: HTMLElement, params: any) => { // Factory method
					return new MyCustomView(client, popup, viewContainer, params, this.someOtherObjectINeed); // Inject other objects
				}
			}
		}
	}
}
```

### View options & transitions

Custom options can be passed into the view and accessed inside. 
There is also a special option called "viewTransition", which applies an animation when your view loads

```typescript
const config = {
	/* ...other config options... */
	uiOptions: {
		viewOverrides: {
			"start": {
				component: MyStartView, // Constructor Method
                options: {
					myCustomOption: "My custom text",
                    viewTransition: "slide-in-bottom"
                }
			}
		}
	}
}
```

Custom options can also be specified as a parameter to the updateUI method
```typescript
this.ui.updateUI('my_custom_view', 
    {/* some custom data specific to this view instance */}, 
    { viewTransition: "slide-in-left" } // each key overrides the default option set in the config
);
```

The current view transitions available are:
- slide-in-left
- slide-in-right
- slide-in-top
- slide-in-bottom

## New TokenScript Token Issuers

Please reach out to us at <sayhi@smarttokenlabs.com>

## Tests

run `npm run test`

## WIKI

[Development](https://github.com/TokenScript/token-negotiator/wiki/developers)

[FAQ](https://github.com/TokenScript/token-negotiator/wiki/faq)

### Help / Questions / Improvements

Please contact us or open an issue via github:
sayhi@smarttokenlabs.com

### Quick Start examples with Vue, React and TypeScript

[Token Negotiator Examples](https://github.com/TokenScript/token-negotiator-examples)

### Roadmap of this library

[Our Roadmap](https://github.com/TokenScript/token-negotiator/wiki/road-map)
