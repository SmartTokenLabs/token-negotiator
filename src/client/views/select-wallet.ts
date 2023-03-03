import { AbstractView } from './view-interface'
import { logger } from '../../utils'

const phantomSVG =
	'<svg width="62px" height="62px" viewBox="-30 -20 180 180" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><title>Phantom logo</title><path d="M57.137,22.8c23.339,0.075 42.264,18.847 42.563,42.1l10.1,0c3.8,0 6.8,3 6.8,6.8c0,19.661 -32.669,36.532 -54.77,36.6l-0.13,0c-23.6,0 -47.4,-19.1 -47.4,-42.7c0,-1.6 0.1,-3.1 0.2,-4.6c2.3,-21.6 20.5,-38.2 42.5,-38.2l0.137,0Z" style="fill:url(#_Linear1);fill-rule:nonzero;"/><path d="M64,0c35.323,0 64,28.677 64,64c0,35.323 -28.677,64 -64,64c-35.323,0 -64,-28.677 -64,-64c0,-35.323 28.677,-64 64,-64Zm-7,22.8l1.366,0.021l1.23,0.057l0.528,0.035c14.242,1.029 26.545,9.033 33.507,20.608l0.521,0.891l0.499,0.902l0.478,0.915l0.455,0.928l0.434,0.939l0.411,0.952l0.388,0.963l0.365,0.974l0.342,0.985l0.394,1.246l0.332,1.166l0.282,1.114l0.265,1.179l0.224,1.148l0.198,1.19l0.147,1.053l0.12,1.062l0.095,1.068l0.067,1.077l0.042,1.083l0.01,0.544c0,0 10.1,0 10.1,0c3.8,0 6.8,3 6.8,6.8l-0.018,0.788l-0.054,0.818l-0.089,0.79l-0.125,0.802l-0.184,0.903l-0.226,0.897l-0.27,0.891l-0.31,0.885l-0.351,0.879l-0.391,0.872l-0.429,0.865l-0.51,0.933l-0.504,0.844l-0.538,0.836l-0.572,0.828l-0.605,0.818l-0.636,0.809l-0.667,0.799l-0.697,0.79l-0.726,0.779l-0.754,0.769l-0.78,0.758l-0.806,0.747l-0.831,0.736c-2.552,2.209 -5.436,4.262 -8.532,6.119l-0.553,0.328l-0.517,0.301l-0.521,0.298l-0.525,0.294l-0.527,0.29l-0.532,0.287c-6.807,3.636 -14.382,6.343 -21.59,7.752l-1.154,0.215l-0.862,0.146c-1.959,0.32 -3.883,0.539 -5.747,0.65l-1.464,0.065l-1.173,0.019l-0.13,-0c-23.6,-0 -47.4,-19.1 -47.4,-42.7c0,-1.6 0.1,-3.1 0.2,-4.6c2.3,-21.6 20.5,-38.2 42.5,-38.2Zm-17.3,34.1l0,9.1c0,3.1 -2.5,5.6 -5.6,5.6c-3.1,-0 -5.6,-2.5 -5.6,-5.6l0,-9.1c0,-3.1 2.5,-5.6 5.6,-5.6c3.1,-0 5.6,2.5 5.6,5.6Zm19.7,-0l0,9.1c0,3.1 -2.5,5.6 -5.6,5.6c-3.1,-0 -5.6,-2.5 -5.6,-5.6l0,-9.1c0,-3.1 2.5,-5.6 5.6,-5.6c3.1,-0 5.6,2.5 5.6,5.6Z" style="fill:url(#_Linear2);"/><defs><linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(5.23303e-15,85.4619,-85.4619,5.23303e-15,65.46,22.76)"><stop offset="0" style="stop-color:#fefeff;stop-opacity:1"/><stop offset="1" style="stop-color:#dfd8fc;stop-opacity:1"/></linearGradient><linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(7.83774e-15,128,-128,7.83774e-15,64,0)"><stop offset="0" style="stop-color:#534ab1;stop-opacity:1"/><stop offset="1" style="stop-color:#551bf8;stop-opacity:1"/></linearGradient></defs></svg>'
const metaMaskSVG =
	'<svg width="62px" version="1.1" id="Layer_1" xmlns:ev="http://www.w3.org/2001/xml-events"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 318.6 318.6"style="enable-background:new 0 0 318.6 318.6;" xml:space="preserve"><title>Metamask logo</title><style type="text/css">.st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round;}.st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round;}.st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round;}.st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}.st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round;}.st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round;}.st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round;}.st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round;}.st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}.st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round;}</style><polygon class="st0" points="274.1,35.5 174.6,109.4 193,65.8 "/><g><polygon class="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	"/><polygon class="st1" points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	"/><polygon class="st1" points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	"/><polygon class="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	"/><polygon class="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	"/><polygon class="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	"/><polygon class="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	"/></g><g><polygon class="st2" points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	"/><polygon class="st2" points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	"/></g><polygon class="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 "/><polygon class="st3" points="179.7,193.5 188,176.1 208,185.2 "/><g><polygon class="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	"/><polygon class="st4" points="207,206.8 211.8,247.4 238.3,207.7 	"/><polygon class="st4" points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	"/><polygon class="st4" points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	"/></g><g><polygon class="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	"/><polygon class="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	"/><polygon class="st5" points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	"/><polygon class="st5" points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	"/></g><polygon class="st6" points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 "/><polygon class="st6" points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 "/><polygon class="st7" points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "/><polygon class="st8" points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "/><g><polygon class="st9" points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 281.8,129.1 275.6,124.3 283.6,118.2 	"/><polygon class="st9" points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 140.6,106.9 44.4,35.5 	"/></g><polygon class="st6" points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 "/><polygon class="st6" points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 "/><polygon class="st6" points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 173.1,227.6 173.3,182.8 "/></svg>'
const walletConnectSVG =
	'<svg width="62px" height="62px" viewBox="0 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><title>Wallet connect logo</title><g transform="matrix(1.7268,0,0,1.7268,159.3,155.744)"><g transform="matrix(1,0,0,1,-107.5,-107.5)"><path d="M55.953,84.792L72.263,100.335C72.263,100.335 84.86,78.281 106.774,78.436C106.774,78.436 126.648,75.152 143.824,101.06L160.354,85.616C160.354,85.616 143.436,59.639 107.409,59.615C107.409,59.615 79.188,56.141 55.953,84.792Z" style="fill:rgb(59,153,252);"/><path d="M42.568,93.225L25.838,109.259L74.827,157.509L107.434,125.302L141.274,157.461L188.677,109.672L172.91,93.916L141.771,126.195L107.369,93.403L74.398,126.501L42.568,93.225Z" style="fill:rgb(59,153,252);"/></g></g></svg>'
const walletConnectV2SVG =
	'<svg fill="none" width="62px" height="62px" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="a"><path d="m0 0h400v400h-400z"/></clipPath><g clip-path="url(#a)"><circle cx="200" cy="200" fill="#141414" r="199.5" stroke="#3b4040"/><path d="m122.519 148.965c42.791-41.729 112.171-41.729 154.962 0l5.15 5.022c2.14 2.086 2.14 5.469 0 7.555l-17.617 17.18c-1.07 1.043-2.804 1.043-3.874 0l-7.087-6.911c-29.853-29.111-78.253-29.111-108.106 0l-7.59 7.401c-1.07 1.043-2.804 1.043-3.874 0l-17.617-17.18c-2.14-2.086-2.14-5.469 0-7.555zm191.397 35.529 15.679 15.29c2.14 2.086 2.14 5.469 0 7.555l-70.7 68.944c-2.139 2.087-5.608 2.087-7.748 0l-50.178-48.931c-.535-.522-1.402-.522-1.937 0l-50.178 48.931c-2.139 2.087-5.608 2.087-7.748 0l-70.7015-68.945c-2.1396-2.086-2.1396-5.469 0-7.555l15.6795-15.29c2.1396-2.087 5.6085-2.087 7.7481 0l50.1789 48.932c.535.522 1.402.522 1.937 0l50.177-48.932c2.139-2.087 5.608-2.087 7.748 0l50.179 48.932c.535.522 1.402.522 1.937 0l50.179-48.931c2.139-2.087 5.608-2.087 7.748 0z" fill="#fff"/></g></svg>'
const torusSVG =
	'<svg width="62px" height="62px" viewBox="0 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><title>Torus logo</title><g transform="matrix(1.9124,0,0,1.9124,159.3,159.3)"><g transform="matrix(1,0,0,1,-107.5,-107.5)"><path d="M57.267,51.007L56.757,84.626L85.505,85.297L85.565,164.593L119.635,164.873L119.472,51.399L57.267,51.007Z" style="fill:rgb(57,150,254);"/><g transform="matrix(1.06773,0,0,1.04155,-3.94432,-8.22515)"><circle cx="139.434" cy="73.102" r="16.365" style="fill:rgb(57,150,254);"/></g></g></g></svg>'
const safeConnectSVG =
	'<svg style="pointer-events: none" xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><title>Safe connect button</title><path fill="rgb(5, 26, 245)" d="M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z" transform="translate(13,28.5) translate(0,0) translate(-13,-13.5)"/><path fill="rgb(5, 26, 245)" d="M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z" transform="translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)"/></svg>'
const flowSVG = `
	<svg xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svg32" x="0px" y="0px" viewBox="0 0 256 256" width="62px" height="62px" style="enable-background:new 0 0 256 256;" xml:space="preserve">
		<style type="text/css">
			.flow-st0{fill:#00EF8B;}
			.flow-st1{fill:#FFFFFF;}
			.flow-st2{fill:#16FF99;}
		</style>
		<sodipodi:namedview bordercolor="#666666" borderopacity="1" fit-margin-bottom="0" fit-margin-left="0" fit-margin-right="0" fit-margin-top="0" gridtolerance="10" guidetolerance="10" id="namedview34" inkscape:current-layer="Layer_1-2" inkscape:cx="-165.09584" inkscape:cy="294.4716" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-height="878" inkscape:window-maximized="1" inkscape:window-width="1440" inkscape:window-x="0" inkscape:window-y="0" inkscape:zoom="0.40971549" objecttolerance="10" pagecolor="#ffffff" showgrid="false">
		</sodipodi:namedview>
		<g id="Layer_2_1_">
			<g id="Layer_1-2">
				<g id="g43" transform="scale(2.56)">
					<circle id="circle20" class="flow-st0" cx="50" cy="50" r="50"/>
					<rect id="rect22" x="57.8" y="42.2" class="flow-st1" width="14.1" height="14.1"/>
					<path id="path24" class="flow-st1" d="M43.7,61.6c0,2.9-2.4,5.3-5.3,5.3s-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3c0,0,0,0,0,0h5.3V42.2 h-5.3C27.7,42.2,19,50.9,19,61.6S27.7,81,38.4,81s19.4-8.7,19.4-19.4l0,0v-5.3H43.7V61.6z"/>
					<path id="path26" class="flow-st1" d="M63.1,35.1H79V21H63.1c-10.7,0-19.4,8.7-19.4,19.4v1.8h14.1v-1.8C57.8,37.5,60.2,35.1,63.1,35.1 z"/>
					<polygon id="polygon28" class="flow-st2" points="57.8,42.2 57.8,42.2 43.7,42.2 43.7,56.3 57.8,56.3"/>
				</g>
			</g>
		</g>
	</svg>
`

export class SelectWallet extends AbstractView {
	render() {
		// TODO only show the wallets that relate to the tokens available.

		const MetaMaskButton =
			typeof window.ethereum !== 'undefined'
				? `<button class="wallet-button-tn" data-wallet="MetaMask" aria-label="Metamask wallet button">
                ${metaMaskSVG}
                <p>MetaMask</p>
            </button>`
				: ''

		const PhantomButton = this.client.solanaAvailable()
			? `<button class="wallet-button-tn" data-wallet="Phantom">
                ${phantomSVG}
                <p>Phantom</p>
            </button>`
			: ''

		const SafeConnectButton = this.client.safeConnectAvailable()
			? `<button class="wallet-button-tn" data-wallet="SafeConnect" aria-label="Safe connect wallet button">
			  ${safeConnectSVG}
			  <p>Safe Connect</p>
			</button>`
			: ''

		const FlowButton = `
			<button class="wallet-button-tn" data-wallet="Flow" aria-label="Safe connect wallet button">
				${flowSVG}
				<p>Flow</p>
			</button>
		`

		this.viewContainer.innerHTML = `
            <div class="inner-content-tn scroll-tn">
              <div class="wallet-selection-view-tn">
                <div class="issuer-view-tn">
                  <div class="brand-tn"></div>
                  <div class="headline-container-tn">
                    <p style="text-align: center;">Select Wallet</p>
                  </div>
                  <div class="wallet-button-container-tn">
                  	${SafeConnectButton}
                    ${MetaMaskButton}
                    <button class="wallet-button-tn" data-wallet="WalletConnect" aria-label="Wallet Connect button">
                      ${walletConnectSVG}
                      <p>Wallet Connect</p>
                    </button>
					<button class="wallet-button-tn" data-wallet="WalletConnectV2" aria-label="Wallet Connect V2 button">
						${walletConnectV2SVG}
						<p>Wallet Connect V2</p>
					</button>
                    <button class="wallet-button-tn" data-wallet="Torus" aria-label="Torus wallet button">
                      ${torusSVG}
                      <p>Torus</p>
                    </button>
                    ${PhantomButton}
					${FlowButton}
                  </div>
                </div>
              </div>
            </div>
        `

		this.viewContainer.querySelectorAll('.wallet-button-tn').forEach((elem: any) => {
			elem.addEventListener('click', this.connectWallet.bind(this))
		})

		// TODO - Add to attestation.id to enable e2e support of additional Wallet Technologies.
		// <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Fortmatic')">
		// ${fortmaticSVG}
		// <p>Fortmatic</p>
		// </button>
		// <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Portis')">
		// ${portisSVG}
		// <p>Portis</p>
		// </button>
		// <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Authereum')">
		// ${authereumSVG}
		// <p>Authereum</p>
		// </button>
	}

	async connectWallet(e: any) {
		let wallet: any = e.currentTarget.dataset.wallet

		logger(2, 'Connect wallet: ' + wallet)

		this.ui.showLoaderDelayed(
			['<h4>Connecting to ' + wallet + '...</h4>', '<small>You may need to unlock your wallet to continue.</small>'],
			500,
		)

		try {
			await this.client.negotiatorConnectToWallet(wallet)
			this.ui.dismissLoader()
			if (this.params?.data?.connectCallback) {
				this.params?.data?.connectCallback()
			} else {
				// TODO: It may be better/faster to fire this on view load.
				this.client.enrichTokenLookupDataOnChainTokens()
				this.ui.updateUI('main', { viewName: 'main' }, { viewTransition: 'slide-in-right' })
			}
			
		} catch (err: any) {
			this.ui.showError(err)
			return
		}
	}
}
