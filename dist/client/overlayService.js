var OverlayService = (function () {
    function OverlayService(config, options, filter) {
        var _this = this;
        this.onClickOutside = function (e) {
            if (e.target.className !== "overlayFabButton") {
                _this.eventSender.closeOverlay();
            }
        };
        this.eventSender = {
            closeOverlay: function () {
                if (_this.refOverlaySelector && _this.refOverlaySelector.contentWindow) {
                    _this.refOverlaySelector.contentWindow.postMessage({
                        evt: "setCloseOverlay",
                    }, "*");
                }
            },
        };
        this.config = config;
        this.options = options;
        this.filter = filter;
        this.assignClientListener();
        this.embedClientOverlay(this.config.tokenName, this.config.tokenOverlayOrigin, this.options, this.filter);
        window.addEventListener("click", this.onClickOutside);
    }
    OverlayService.prototype.isEventFromOverlay = function (origin, tokenOverlayOrigin) {
        return origin === tokenOverlayOrigin;
    };
    OverlayService.prototype.assignClientListener = function () {
        var _this = this;
        window.addEventListener("message", function (event) {
            if (!_this.isEventFromOverlay(event.origin, _this.config.tokenOverlayOrigin))
                return;
            _this.eventReciever(event.data);
        }, false);
    };
    OverlayService.prototype.embedClientOverlay = function (tokenName, tokenOverlayOrigin, options, filter) {
        var _this = this;
        setTimeout(function () {
            var refTokenSelector = document.querySelector(options.tokenSelectorContainer);
            if (refTokenSelector) {
                var iframe = "<div class=\"" + tokenName + "OverlayWrapper\"><iframe class=\"" + tokenName + "Overlay\" style=\"border:0; resize: none; overflow: auto;\" height=\"335px\" width=\"376px\" src=\"" + tokenOverlayOrigin + "\" allowtransparency=\"true\" title=\"outlet\" frameborder=\"0\" style=\"border:0\" allowfullscreen frameborder=\"no\" scrolling=\"no\"></iframe></div>";
                refTokenSelector.innerHTML = iframe;
                var refOverlaySelector_1 = document.querySelector(options.tokenSelectorContainer + " ." + tokenName + "Overlay");
                _this.refOverlaySelector = refOverlaySelector_1;
                refOverlaySelector_1.onload = function () {
                    refOverlaySelector_1.contentWindow.postMessage({
                        evt: "getTokenButtonHTML",
                        data: {
                            tokenName: tokenName,
                            filter: filter,
                            options: options,
                        },
                    }, "*");
                };
            }
        }, 0);
    };
    OverlayService.prototype.eventReciever = function (data) {
        switch (data.evt) {
            case "setTokenButtonHTML":
                if (!document.getElementById("tokenButtonContainer")) {
                    var newDiv = document.createElement("div");
                    newDiv.setAttribute("id", "tokenButtonContainer");
                    newDiv.style.cssText = "\n              display: flex; \n              justify-content: flex-end;\n              margin: 10px;\n            ";
                    newDiv.innerHTML = data.button;
                    document.querySelector("" + this.options.tokenSelectorContainer).style.margin = "10px";
                    document
                        .querySelector("" + this.options.tokenSelectorContainer)
                        .append(newDiv);
                }
                break;
            case "hideOverlay":
                document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "OverlayWrapper").style.display = "none";
                break;
            case "showOverlay":
                document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "OverlayWrapper").style.display = "block";
                break;
        }
    };
    OverlayService.prototype.overlayClickHandler = function () {
        document
            .querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "Overlay")
            .contentWindow.postMessage({ evt: "setToggleOverlayHandler" }, "*");
    };
    return OverlayService;
}());
export default OverlayService;
//# sourceMappingURL=overlayService.js.map