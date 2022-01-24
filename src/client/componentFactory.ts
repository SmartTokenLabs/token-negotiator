interface CreateTokenInterface {
  tokenIssuerKey: string;
  title: string;
  index: number;
  emblem: string;
  data: any;
  toggleState: boolean;
}

export const createOverlayMarkup = (heading="Available Tokens") => {
  return `
    <div class="overlay-content-tn">
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
    </div>
  `;
};


export const issuerConnectTab = (issuer:any) => {
  return `
    <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
      <p class="issuer-connect-title">Devcon</p>
      <button aria-label="connect with the token issuer ${issuer}" aria-hidden="false" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}" onClick='connectTokenIssuerWithTab(event)'>Connect</button>
      <button aria-label="tokens available from token issuer ${issuer}" aria-hidden="true" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="tokens-btn-tn" data-issuer="${issuer}" onClick='navigateToTokensView(event)'>Tokens Available</button>
    </li>
  `;
};

export const issuerConnectIframe = (issuer:any) => {
  return `
    <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
      <p class="issuer-connect-title">Devcon</p>
      <button aria-label="connect with the token issuer ${issuer}" aria-hidden="false" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}" onClick='connectTokenIssuerWithTab(event)'>Connect</button>
      <button aria-hidden="true" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="tokens-btn-tn" data-issuer="${issuer}" onClick='navigateToTokensView(event)'>Tokens Available</button>
    </li>
  `;
};

export const createToken = (config: CreateTokenInterface) => {
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

export const createFabButton = () => {
  return `
    <button aria-label="token negotiator toggle" class="overlay-fab-button-tn" onclick="overlayClickHandler()">
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><path fill="white" id="svg-tn-left" d="M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z" transform="translate(13,28.5) translate(0,0) translate(-13,-13.5)"/><path id="svg-tn-right" fill="white" d="M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z" transform="translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)"/></svg>
    </button>
`;
}

