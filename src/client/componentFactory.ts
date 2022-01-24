interface CreateTokenInterface {
  tokenIssuerKey: string;
  title: string;
  index: number;
  emblem: string;
  data: any;
  toggleState: boolean;
}

const metaMaskSVG = '<svg width="62px" version="1.1" id="Layer_1" xmlns:ev="http://www.w3.org/2001/xml-events"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 318.6 318.6"style="enable-background:new 0 0 318.6 318.6;" xml:space="preserve"><style type="text/css">.st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round;}.st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round;}.st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round;}.st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}.st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round;}.st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round;}.st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round;}.st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round;}.st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}.st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round;}</style><polygon class="st0" points="274.1,35.5 174.6,109.4 193,65.8 "/><g><polygon class="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	"/><polygon class="st1" points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	"/><polygon class="st1" points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	"/><polygon class="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	"/><polygon class="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	"/><polygon class="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	"/><polygon class="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	"/></g><g><polygon class="st2" points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	"/><polygon class="st2" points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	"/></g><polygon class="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 "/><polygon class="st3" points="179.7,193.5 188,176.1 208,185.2 "/><g><polygon class="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	"/><polygon class="st4" points="207,206.8 211.8,247.4 238.3,207.7 	"/><polygon class="st4" points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	"/><polygon class="st4" points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	"/></g><g><polygon class="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	"/><polygon class="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	"/><polygon class="st5" points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	"/><polygon class="st5" points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	"/></g><polygon class="st6" points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 "/><polygon class="st6" points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 "/><polygon class="st7" points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "/><polygon class="st8" points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "/><g><polygon class="st9" points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 281.8,129.1 275.6,124.3 283.6,118.2 	"/><polygon class="st9" points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 140.6,106.9 44.4,35.5 	"/></g><polygon class="st6" points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 "/><polygon class="st6" points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 "/><polygon class="st6" points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 173.1,227.6 173.3,182.8 "/></svg>';

export const createOpeningViewMarkup = (openingText="Open a new world of discounts, available with your NFT's and Tokens.") => {
  return `
      <div class="opening-content-view-tn">
          <div class="brand-tn"></div>
          <div class="inner-content-tn">
            <div class="inner-content-block-tn">
              <button class="opening-btn-tn" 
              onClick="negotiatorUpdateOverlayViewState('CONNECT_WALLET')">
              Let's go!</button>
              <div>${openingText}</div>
            </div>
          </div>
      </div>
  `;
}

export const createWalletSelectionViewMarkup = () => {
  return `
    <div class="wallet-selection-view-tn">
      <div class="inner-content-tn">
        <div class="issuer-view-tn">
          <div class="brand-tn"></div>
          <div class="headline-container-tn">
            <p style="text-align: center;">Select Wallet</p>
          </div>
          <div class="wallet-button-container-tn">
            <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('MetaMask')">
              ${metaMaskSVG}
              <p>MetaMask</p>
            </button>
            <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('WalletConnect')">
              ${metaMaskSVG}
              <p>Wallet Connect</p>
            </button>
            <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Fortmatic')">
              ${metaMaskSVG}
              <p>Fortmatic</p>
            </button>
            <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Torus')">
              ${metaMaskSVG}
              <p>Torus</p>
            </button>
            <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Portis')">
              ${metaMaskSVG}
              <p>Portis</p>
            </button>
            <button class="wallet-button-tn" class="" onClick="negotiatorConnectToWallet('Authereum')">
              ${metaMaskSVG}
              <p>Authereum</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export const createIssuerViewMarkup = (heading="Available Tokens") => {
  return `
    <div class="inner-content-tn">
      <div class="issuer-view-tn">
        <div class="brand-tn"></div>
        <div class="headline-container-tn">
          <p class="headline-tn">${heading}</p>
        </div>
        <ul class="token-issuer-list-container-tn" role="menubar"></ul>
      </div>
      <div class="token-view-tn" style="display: none;">
        <div class="brand-tn"></div>
        <div style="display: flex">
          <button aria-label="back to token issuer menu" class="back-to-menu-tn" onClick='navigateToTokensView(event)'>
            <svg style="position: relative; top: 1px;" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                    <circle fill="#EFEFEF" cx="16" cy="16" r="16"/>
                    <path d="m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z" fill="#000" fill-rule="nonzero"/>
                </g>
            </svg>
          </button>
          <p class="headline-tn token-name">Token Name Here</p>
        </div>
        <ul class="token-list-container-tn" role="menubar"></ul>
      </div>
    </div>
  `;
};


export const issuerConnectTabMarkup = (issuer:any) => {
  return `
    <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
      <p class="issuer-connect-title">Devcon</p>
      <button aria-label="connect with the token issuer ${issuer}" aria-hidden="false" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}" onClick='connectTokenIssuerWithTab(event)'>Connect</button>
      <button aria-label="tokens available from token issuer ${issuer}" aria-hidden="true" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="tokens-btn-tn" data-issuer="${issuer}" onClick='navigateToTokensView(event)'>Tokens Available</button>
    </li>
  `;
};

export const issuerConnectIframeMarkup = (issuer:any) => {
  return `
    <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
      <p class="issuer-connect-title">Devcon</p>
      <button aria-label="connect with the token issuer ${issuer}" aria-hidden="false" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}" onClick='connectTokenIssuerWithIframe(event)'>Connect</button>
      <button aria-hidden="true" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="tokens-btn-tn" data-issuer="${issuer}" onClick='navigateToTokensView(event)'>Tokens Available</button>
    </li>
  `;
};

export const createTokenMarkup = (config: CreateTokenInterface) => {
  const { tokenIssuerKey, title, data, index, emblem, toggleState } = config;
  return `
    <li class='token-tn'>
      <img class='emblem-tn' src=${emblem} />
      <div class='data-tn'>
          <p class='token-title-tn'>${title}</p>
          <p class='detail-tn'>#${index}</p>
        </div>
      <div class='toggle-tn'>
        <input ${toggleState === true ? 'checked' : '' } data-key='${tokenIssuerKey}' data-token='${JSON.stringify(data)}' onClick='tokenToggleSelection(event)' data-index='${index}' type='checkbox' name='toggle${index}' class='mobileToggle-tn toggle-tn' id='toggle${index}'>
        <label for='toggle${index}'></label>
      </div>
    </li>
  `;
};

export const createFabButtonMarkup = () => {
  return `
    <button aria-label="token negotiator toggle" class="overlay-fab-button-tn" onclick="overlayClickHandler()">
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><path fill="white" id="svg-tn-left" d="M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z" transform="translate(13,28.5) translate(0,0) translate(-13,-13.5)"/><path id="svg-tn-right" fill="white" d="M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z" transform="translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)"/></svg>
    </button>
`;
}

