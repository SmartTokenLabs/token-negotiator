// This is a client service designed to initiate cross origin communication with the overlay component
// to enable user interaction to load tokens into the client website for use.
// @ts-nocheck
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
    this.embedClientOverlay(
      this.config.tokenName,
      this.config.tokenOverlayOrigin,
      this.options,
      this.filter
    );

    window.addEventListener("click", this.onClickOutsideOfOverlay);
  }

  onClickOutsideOfOverlay = (e) => {
    if(e.target.className !== "overlay-fab-button-tn"){
      this.eventSender.closeOverlay();
    } 
  };

  // sends events
  eventSender = {
    closeOverlay: () => {
      if (this.refOverlaySelector && this.refOverlaySelector.contentWindow) {
        this.refOverlaySelector.contentWindow.postMessage(
          {
            evt: "setCloseOverlay",
          },
          this.config.tokenOverlayOrigin
        );
      }
    },
  };

  isEventFromOverlay(origin, tokenOverlayOrigin) {
    return origin === tokenOverlayOrigin;
  }

  assignClientListener() {
    window.addEventListener(
      "message",
      (event) => {
        if (
          !this.isEventFromOverlay(event.origin, this.config.tokenOverlayOrigin)
        )
          return;
        this.eventReciever(event.data);
      },
      false
    );
  }

  embedClientOverlay(tokenName, tokenOverlayOrigin, options, filter) {
    setTimeout(() => {
      let refTokenSelector = document.querySelector(options.tokenSelectorContainer);
      if (refTokenSelector) {
        const iframe = `<div class="${tokenName}-overlay-wrapper-tn"><iframe class="${tokenName}-overlay-tn" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${tokenOverlayOrigin}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe></div>`;
        refTokenSelector.innerHTML = iframe;
        let refOverlaySelector = document.querySelector(
          `${options.tokenSelectorContainer} .${tokenName}-overlay-tn`
        );
        this.refOverlaySelector = refOverlaySelector;
        refOverlaySelector.onload = function () {
          refOverlaySelector.contentWindow.postMessage(
            {
              evt: "getTokenButtonHTML",
              data: {
                tokenName,
                filter,
                options,
              },
            },
            this.config.tokenOverlayOrigin
          );
        };
      }
    }, 0);
  }

  eventReciever(data) {
    // TODO store/cache all elements once on load to simplify lib
    const el = document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}-overlay-wrapper-tn`);
    switch (data.evt) {
      case "setTokenButtonHTML":
        if (!document.getElementById("token-button-container")) {
          let newElement = document.createElement("div");
          newElement.setAttribute("id", "token-button-container");
          newElement.style.cssText = `
              display: flex; 
              justify-content: flex-end;
              margin: 10px;
            `;
          newElement.innerHTML = data.button;
          const tokenSelectorContainer = document.querySelector(`${this.options.tokenSelectorContainer}`);
          if(tokenSelectorContainer){
            tokenSelectorContainer.style.margin = "10px";
            tokenSelectorContainer.append(newElement);
          }
        }
        break;
      case "hideOverlay":
        if(el) el.style.display = "none";
        break;
      case "showOverlay":
        if(el) el.style.display = "block";
        break;
    }
  }

  overlayClickHandler() {
    const el = document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}-overlay-tn`);
    if(el) el.contentWindow.postMessage({ evt: "setToggleOverlayHandler" }, this.config.tokenOverlayOrigin);
  }
}

export default OverlayService;
