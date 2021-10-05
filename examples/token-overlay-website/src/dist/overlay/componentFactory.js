export const createOverlayMarkup = () => {
    return `
    <div class="overlay">
      <div class="brand"></div>
      <p class="headline">Available Tokens</p>
      <div class="token-container">
        <p style="padding: 0 16px; color: grey">No tokens available.</p>
      </div>
    </div>
  `;
};
export const createToken = (data, index, tokenImage) => {
    return `
    <div class='token'>
      <div class='content'>
        <svg class='emblem' src=${tokenImage} />
        <div class='data'>
          <p class='title'>Devcon Ticket #${index}</p>
          <p class='detail'>Discount for Hotels and VIP Section</p>
        </div>
      </div>
      <div class='toggle'>
        <input onClick='tokenToggleSelection()' data-index='${index}' data-token='${JSON.stringify(data)}' type='checkbox' name='toggle${index}' class='mobileToggle' id='toggle${index}'>
        <label for='toggle${index}'></label>
      </div>
    </div>
  `;
};
export const createFabButton = (button) => {
    return `
    <button onclick="negotiator.overlayClickHandler()" style="padding: 0; height:80px; width:80px; border: 0; box-shadow: 0 2px 5px 0 #676767; border-radius: 64px; cursor: pointer; z-index: 999; position: relative;">
      <svg src=${button}></svg>
    </button>
  `;
};
