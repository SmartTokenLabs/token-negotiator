var OverlayService = (function () {
    function OverlayService(config, options, filter) {
        var _this = this;
        this.onClickOutsideOfOverlay = function (e) {
            if (e.target.className !== "overlay-fab-button-tn") {
                _this.eventSender.closeOverlay();
            }
        };
        this.eventSender = {
            closeOverlay: function () {
                if (_this.refOverlaySelector && _this.refOverlaySelector.contentWindow) {
                    _this.refOverlaySelector.contentWindow.postMessage({
                        evt: "setCloseOverlay",
                    }, '*');
                }
            },
        };
        this.config = config;
        this.options = options;
        this.filter = filter;
        this.assignClientListener();
        this.embedClientOverlay(this.config.tokenName, this.config.tokenOverlayOrigin, this.options, this.filter);
        window.addEventListener("click", this.onClickOutsideOfOverlay);
    }
    OverlayService.prototype.isEventFromOverlay = function (origin, tokenOverlayOrigin) {
        return origin === tokenOverlayOrigin;
    };
    OverlayService.prototype.assignClientListener = function () {
        var _this = this;
        window.addEventListener("message", function (event) {
            _this.eventReciever(event.data);
        }, false);
    };
    OverlayService.prototype.embedClientOverlay = function (tokenName, tokenOverlayOrigin, options, filter) {
        var _this = this;
        setTimeout(function () {
            var refTokenSelector = document.querySelector(options.tokenSelectorContainer);
            if (refTokenSelector) {
                var iframe = "<div class=\"" + tokenName + "-overlay-wrapper-tn\"><iframe class=\"" + tokenName + "-overlay-tn\" style=\"border:0; resize: none; overflow: auto;\" height=\"335px\" width=\"376px\" src=\"" + tokenOverlayOrigin + "\" allowtransparency=\"true\" title=\"outlet\" frameborder=\"0\" style=\"border:0\" allowfullscreen frameborder=\"no\" scrolling=\"no\"></iframe></div>";
                refTokenSelector.innerHTML = iframe;
                var refOverlaySelector_1 = document.querySelector(options.tokenSelectorContainer + " ." + tokenName + "-overlay-tn");
                _this.refOverlaySelector = refOverlaySelector_1;
                refOverlaySelector_1.onload = function () {
                    refOverlaySelector_1.contentWindow.postMessage({
                        evt: "getTokenButtonHTML",
                        data: {
                            tokenName: tokenName,
                            filter: filter,
                            options: options,
                        },
                    }, '*');
                };
            }
        }, 0);
    };
    OverlayService.prototype.eventReciever = function (data) {
        var el = document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "-overlay-wrapper-tn");
        switch (data.evt) {
            case "setTokenButtonHTML":
                if (!document.getElementById("token-button-container")) {
                    var newElement = document.createElement("div");
                    newElement.setAttribute("id", "token-button-container");
                    newElement.style.cssText = "\n              display: flex; \n              justify-content: flex-end;\n              margin: 10px;\n            ";
                    newElement.innerHTML = data.button;
                    var tokenSelectorContainer = document.querySelector("" + this.options.tokenSelectorContainer);
                    if (tokenSelectorContainer) {
                        tokenSelectorContainer.style.margin = "10px";
                        tokenSelectorContainer.append(newElement);
                    }
                }
                break;
            case "hideOverlay":
                if (el)
                    el.style.display = "none";
                break;
            case "showOverlay":
                if (el)
                    el.style.display = "block";
                break;
        }
    };
    OverlayService.prototype.overlayClickHandler = function () {
        var el = document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "-overlay-tn");
        if (el)
            el.contentWindow.postMessage({ evt: "setToggleOverlayHandler" }, '*');
    };
    return OverlayService;
}());
export default OverlayService;
//# sourceMappingURL=overlayService.js.map