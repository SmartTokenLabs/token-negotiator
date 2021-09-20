// @ts-ignore
import tokenImage from './../../../theme/fab-button.svg';

const componentFactory = {
  createModalSkeleton: () => {
    return `
      <div class="modal">
        <div class="brand"></div>
        <p class="headline">Available Tokens</p>
        <div class="token-container">
          <p style="padding: 0 16px; color: grey">No tokens available.</p>
        </div>
      </div>
    `;
  },
  createToken: (data:any, index:any) => {
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
  },
  createFabButton: (buttonURL:string) => {
    return `
      <button 
        onclick="negotiator.modalClickHandler()"
        style="height:80px; width:80px; border: 0; background-image: url(${buttonURL}); box-shadow: 0 2px 5px 0 #676767; border-radius: 64px; cursor: pointer; z-index: 999; position: relative;">
      </button>
    `;
  }
}

export default componentFactory;
