
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
          <p class="headline-tn">${heading}</p>
          <ul class="token-issuer-list-container-tn" role="menubar"></ul>
        </div>
        <div class="token-view-tn">
          <div class="brand-tn"></div>
          <div style="display: flex">
            <button class="back-to-menu-tn" onClick='navigateToTokensView(event)'>< back</button>
            <p class="headline-tn token-name">Token Name Here</p>
          </div>
          <ul class="token-list-container-tn" role="menubar"></ul>
        </div>
      </div>
    </div>
  `;
};

//
// export const createOverlayMarkupCookieSupported = (heading="Available Tokens") => {
//   return `
//     <div class="overlay-content-tn">
//       <div class="brand-tn"></div>
//       <p class="headline-tn">${heading}</p>
//       <div class="token-issuer-list-container-tn"></div>
//       <div class="token-container-tn">
//         <p class="no-tokens-tn">No tokens available.</p>
//       </div>
//     </div>
//   `;
// };

// export const createOverlayMarkupCookieSupported = (heading="Available Tokens") => {
//   return `
//     <div class="overlay-content-tn">
//       <div class="brand-tn"></div>
//       <p class="headline-tn">${heading}</p>
//       <div class="token-container-tn">
//         <p class="no-tokens-tn">No tokens available.</p>
//       </div>
//     </div>
//   `;
// };

export const issuerConnect = (issuer:any) => {
  return `
    <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
      <p class="issuer-connect-title">Devcon</p>
      <button aria-hidden="false" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}" onClick='connectToken(event)'>Connect</button>
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
          <p class='title-tn'>${title}</p>
          <p class='detail-tn'>#${index}</p>
        </div>
      <div class='toggle-tn'>
        <input ${toggleState === true ? 'checked' : '' } data-key='${tokenIssuerKey}' data-token='${JSON.stringify(data)}' onClick='tokenToggleSelection(event)' data-index='${index}' type='checkbox' name='toggle${index}' class='mobileToggle-tn toggle-tn' id='toggle${index}'>
        <label for='toggle${index}'></label>
      </div>
    </li>
  `;
};

// export const createTokenCookieSupported = (config: CreateTokenInterface) => {
//   const { tokenIssuerKey, title, data, index, emblem } = config;
//   return `
//     <div class='token-tn'>
//       <img class='emblem-tn' src=${emblem} />
//       <div class='data-tn'>
//           <p class='title-tn'>${title}</p>
//           <p class='detail-tn'>#${index}</p>
//         </div>
//       <div class='toggle-tn'>
//         <input data-key='${tokenIssuerKey}' data-token='${JSON.stringify(data)}' onClick='tokenToggleSelection(event)' data-index='${index}' type='checkbox' name='toggle${index}' class='mobileToggle-tn toggle-tn' id='toggle${index}'>
//         <label for='toggle${index}'></label>
//       </div>
//     </div>
//   `;
// };

export const createFabButton = () => {
  return `
    <button class="overlay-fab-button-tn" onclick="window.negotiator.overlayClickHandler()">      
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><path fill="white" id="svg-tn-left" d="M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z" transform="translate(13,28.5) translate(0,0) translate(-13,-13.5)"/><path id="svg-tn-right" fill="white" d="M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z" transform="translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)"/></svg>
    </button>
`;
}

