
// This is a client service designed to initiate cross origin communication with the overlay component
// to enable user interaction to load tokens into the client website for use.

class OverlayService {

  constructor(config, options, filter) {
    this.config = config;
    this.options = options;
    this.filter = filter;
    // listen to incoming events
    this.assignClientListener();
    // embed the overlay html component into view and request from overlay origin
    // the button mark up which can be rendered into view and used to access the overlay 
    // by the end user.
    this.embedClientModal(this.config.tokenName,this.config.tokenOrigin,this.options,this.filter);
  }

  isEventFromOverlay(origin, tokenOrigin) { return origin === tokenOrigin };

  assignClientListener() {
    window.addEventListener('message', (event) => {
      if(!this.isEventFromOverlay(event.origin, this.config.tokenOrigin)) return;
      this.clientEventController(event.data);
    }, false);
  }

  embedClientModal(tokenName, tokenOrigin, options, filter) {
    setTimeout(() => {
      let refTokenSelector = document.querySelector(options.tokenSelectorContainer);
      if(refTokenSelector) {
        const iframe = `<div class="${tokenName}ModalWrapper"><iframe class="${tokenName}Modal" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${tokenOrigin}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe></div>`;
        refTokenSelector.innerHTML = iframe;
        let refModalSelector = document.querySelector(`${options.tokenSelectorContainer} .${tokenName}Modal`);
        refModalSelector.onload = function() {
          refModalSelector
          .contentWindow
          .postMessage({
            evt: "getTokenButtonHTML",
            data: {
              tokenName,
              filter,
              options
            }
          }, '*');
        };
      }
    }, 0);
  }

  clientEventController(data) {
    switch(data.evt) {
      case 'setTokenButtonHTML':
          if(!document.getElementById("tokenButtonContainer")) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute('id', 'tokenButtonContainer')
            newDiv.style.cssText = `
              display: flex; 
              justify-content: flex-end;
              margin: 10px;
            `;
            newDiv.innerHTML = data.button;
            document.querySelector(`${this.options.tokenSelectorContainer}`).style.margin = '10px';
            document.querySelector(`${this.options.tokenSelectorContainer}`).append(newDiv);
          }
        break;
      case 'hideModal':
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}ModalWrapper`).style.display = 'none';
        break;
      case 'showModal':
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}ModalWrapper`).style.display = 'block';
        break;
    }
  }

  modalClickHandler() {
    document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}Modal`)
    .contentWindow
    .postMessage({ evt: "setToggleModalHandler" }, '*');
  }

}

export default OverlayService;