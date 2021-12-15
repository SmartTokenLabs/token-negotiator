
interface CreateTokenInterface {
  tokenIssuerKey: string;
  title: string;
  index: number;
  emblem: string;
  data: any;
}

export const createOverlayMarkup = (heading="Available Tokens") => {
  return `
    <div class="overlay-content-tn">
      <div class="brand-tn"></div>
      <p class="headline-tn">${heading}</p>
      <div class="token-container-tn">
        <p class="no-tokens-tn">No tokens available.</p>
      </div>
    </div>
  `;
};

export const createToken = (config: CreateTokenInterface) => {
  const { tokenIssuerKey, title, data, index, emblem } = config;
  return `
    <div class='token-tn'>
      <img class='emblem-tn' src=${emblem} />
      <div class='data-tn'>
          <p class='title-tn'>${title}</p>
          <p class='detail-tn'>#${index}</p>
        </div>
      <div class='toggle-tn'>
        <input data-key='${tokenIssuerKey}' data-token='${JSON.stringify(data)}' onClick='tokenToggleSelection(event)' data-index='${index}' type='checkbox' name='toggle${index}' class='mobileToggle-tn toggle-tn' id='toggle${index}'>
        <label for='toggle${index}'></label>
      </div>
    </div>
  `;
};

export const createFabButton = () => {
  return `
    <button class="overlay-fab-button-tn" onclick="window.negotiator.overlayClickHandler()">      
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><path fill="white" id="svg-tn-left" d="M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z" transform="translate(13,28.5) translate(0,0) translate(-13,-13.5)"/><path id="svg-tn-right" fill="white" d="M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z" transform="translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)"/></svg>
    </button>
`;
}

