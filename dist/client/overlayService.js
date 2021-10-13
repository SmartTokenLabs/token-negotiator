class OverlayService {
    constructor(config, options, filter) {
        this.config = config;
        this.options = options;
        this.filter = filter;
        this.assignClientListener();
        this.embedClientOverlay(this.config.tokenName, this.config.tokenOverlayOrigin, this.options, this.filter);
    }
    isEventFromOverlay(origin, tokenOverlayOrigin) { return origin === tokenOverlayOrigin; }
    ;
    assignClientListener() {
        window.addEventListener('message', (event) => {
            if (!this.isEventFromOverlay(event.origin, this.config.tokenOverlayOrigin))
                return;
            this.clientEventController(event.data);
        }, false);
    }
    embedClientOverlay(tokenName, tokenOverlayOrigin, options, filter) {
        setTimeout(() => {
            let refTokenSelector = document.querySelector(options.tokenSelectorContainer);
            if (refTokenSelector) {
                const iframe = `<div class="${tokenName}OverlayWrapper"><iframe class="${tokenName}Overlay" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${tokenOverlayOrigin}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe></div>`;
                refTokenSelector.innerHTML = iframe;
                let refOverlaySelector = document.querySelector(`${options.tokenSelectorContainer} .${tokenName}Overlay`);
                refOverlaySelector.onload = function () {
                    refOverlaySelector
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
        switch (data.evt) {
            case 'setTokenButtonHTML':
                if (!document.getElementById("tokenButtonContainer")) {
                    let newDiv = document.createElement("div");
                    newDiv.setAttribute('id', 'tokenButtonContainer');
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
            case 'hideOverlay':
                document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}OverlayWrapper`).style.display = 'none';
                break;
            case 'showOverlay':
                document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}OverlayWrapper`).style.display = 'block';
                break;
        }
    }
    overlayClickHandler() {
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.config.tokenName}Overlay`)
            .contentWindow
            .postMessage({ evt: "setToggleOverlayHandler" }, '*');
    }
}
export default OverlayService;
