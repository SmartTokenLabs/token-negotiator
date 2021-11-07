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
    // window.removeEventListener("click", onClickOutsideOfOverlay);
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
          "*"
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
      let refTokenSelector = document.querySelector(
        options.tokenSelectorContainer
      );
      if (refTokenSelector) {
        const iframe = `<div class="${tokenName}-overlay-wrapper-tn"><iframe class="${tokenName}-overlay-tn" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${tokenOverlayOrigin}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe></div>`;
        refTokenSelector.innerHTML = iframe;
        let refOverlaySelector = document.querySelector(
          `${options.tokenSelectorContainer} .${tokenName}-overlay`
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
            "*"
          );
        };
      }
    }, 0);
  }

  eventReciever(data) {
    switch (data.evt) {
      case "setTokenButtonHTML":
        if (!document.getElementById("token-button-container")) {
          let newDiv = document.createElement("div");
          newDiv.setAttribute("id", "token-button-container");
          newDiv.style.cssText = `
              display: flex; 
              justify-content: flex-end;
              margin: 10px;
            `;
          newDiv.innerHTML = data.button;
          document.querySelector(
            `${this.options.tokenSelectorContainer}`
          ).style.margin = "10px";
          document
            .querySelector(`${this.options.tokenSelectorContainer}`)
            .append(newDiv);
        }
        break;
      case "hideOverlay":
        document.querySelector(
          `${this.options.tokenSelectorContainer} .${this.config.tokenName}-overlay-wrapper`
        ).style.display = "none";
        break;
      case "showOverlay":
        document.querySelector(
          `${this.options.tokenSelectorContainer} .${this.config.tokenName}-overlay-wrapper`
        ).style.display = "block";
        break;
    }
  }

  // TODO move postMessage into eventSender
  overlayClickHandler() {
    document
      .querySelector(
        `${this.options.tokenSelectorContainer} .${this.config.tokenName}Overlay`
      )
      .contentWindow.postMessage({ evt: "setToggleOverlayHandler" }, "*");
  }
}

export default OverlayService;
