import { getCookie } from "./../utils/index";
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
                    }, _this.config.tokenOverlayOrigin);
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
                var iframe = "<div class=\"" + tokenName + "-overlay-wrapper-tn\"><iframe class=\"" + tokenName + "-overlay-tn\" style=\"border:0; resize: none; overflow: auto;\" height=\"335px\" width=\"376px\" src=\"" + tokenOverlayOrigin + "\" allowtransparency=\"true\" title=\"outlet\" frameborder=\"0\" style=\"border:0\" allowfullscreen frameborder=\"no\" scrolling=\"no\"></iframe></div>";
                refTokenSelector.innerHTML = iframe;
                var refOverlaySelector = document.querySelector(options.tokenSelectorContainer + " ." + tokenName + "-overlay-tn");
                _this.refOverlaySelector = refOverlaySelector;
                refOverlaySelector.onload = function () {
                    _this.setTokenButtonHTML(getCookie('fabbuttontn'));
                };
            }
        }, 0);
    };
    OverlayService.prototype.setTokenButtonHTML = function (button) {
        if (!document.getElementById("token-button-container")) {
            var newElement = document.createElement("div");
            newElement.setAttribute("id", "token-button-container");
            newElement.style.cssText = "\n          display: flex; \n          justify-content: flex-end;\n          margin: 10px;\n        ";
            newElement.innerHTML = button;
            var tokenSelectorContainer = document.querySelector("" + this.options.tokenSelectorContainer);
            if (tokenSelectorContainer) {
                tokenSelectorContainer.style.margin = "10px";
                tokenSelectorContainer.append(newElement);
            }
        }
    };
    OverlayService.prototype.eventReciever = function (data) {
        switch (data.evt) {
            case "hideOverlay":
                var el = document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "-overlay-wrapper-tn");
                if (el)
                    el.style.display = "none";
                break;
            case "showOverlay":
                var el = document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "-overlay-wrapper-tn");
                if (el)
                    el.style.display = "block";
                break;
        }
    };
    OverlayService.prototype.overlayClickHandler = function () {
        var el = document.querySelector(this.options.tokenSelectorContainer + " ." + this.config.tokenName + "-overlay-tn");
        if (el) {
        }
    };
    return OverlayService;
}());
export default OverlayService;
//# sourceMappingURL=overlayService.js.map