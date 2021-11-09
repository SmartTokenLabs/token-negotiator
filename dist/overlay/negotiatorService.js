import { config } from "./../config";
import { getTokens } from './../core';
import { createOverlayMarkup, createToken, createFabButton } from "./componentFactory";
var NegotiatorService = (function () {
    function NegotiatorService() {
        var _this = this;
        this.eventReciever = function (dataObject) {
            var data = dataObject.data, evt = dataObject.evt;
            switch (evt) {
                case 'getTokenButtonHTML':
                    if (!data.tokenName)
                        return console.warn('token negotiator: overlay eventReciever() missing required parameters.');
                    document.querySelector('.tk-overlay').innerHTML = _this.createOverlayMarkup();
                    document.getElementsByClassName('overlay')[0].style.transition = 'all 0.2s ease-out';
                    _this.configuration = {
                        filter: data.filter,
                        tokenName: data.tokenName,
                        options: data.options
                    };
                    _this.getTokens({
                        filter: _this.filter,
                        tokenName: _this.config.tokenName,
                        tokensOrigin: _this.config.tokenOrigin,
                        localStorageItemName: _this.config.localStorageItemName,
                        tokenParser: _this.config.tokenParser,
                        unsignedTokenDataName: _this.config.unsignedTokenDataName
                    }).then(function (tokens) {
                        _this.addTokens(tokens);
                        _this.eventSender.emitTokenButtonHTML();
                    });
                    break;
                case 'setSelectedTokens':
                    _this.eventSender.emitSelectedTokens();
                    break;
                case 'setCloseOverlay':
                    var element = document.querySelector(".tk-overlay .overlay");
                    var isOpen = element.classList.contains("open");
                    if (isOpen)
                        _this.overlayClickHandler();
                    break;
                case 'setToggleOverlayHandler':
                    _this.eventSender.emitOverlayToggleState();
                    break;
            }
        };
        this.eventSender = {
            emitTokenButtonHTML: function () {
                window.top.postMessage({
                    evt: 'setTokenButtonHTML',
                    button: _this.createFabButton(_this.config.fabButton)
                }, document.referrer);
            },
            emitSelectedTokens: function () {
                window.top.postMessage({
                    evt: 'setSelectedTokens',
                    selectedTokens: _this.selectedTokens
                }, document.referrer);
            },
            overlayClickTimer: null,
            emitOverlayToggleState: function () {
                var toggleOverlayState = _this.overlayClickHandler();
                clearTimeout(_this.overlayClickTimer);
                if (toggleOverlayState === 'close')
                    _this.closeOverlay();
                else
                    _this.showOverlay();
            }
        };
        this.closeOverlay = function () {
            _this.overlayClickTimer = setTimeout(function () {
                window.top.postMessage({ evt: 'hideOvelay', state: 'close' }, document.referrer);
            }, 1000);
        };
        this.showOverlay = function () {
            window.top.postMessage({ evt: 'showOverlay', state: 'open' }, document.referrer);
        };
        this.overlayClickHandler = function () {
            var element = document.querySelector(".tk-overlay .overlay");
            var isOpen = element.classList.contains("open");
            element.classList.toggle("open");
            if (!isOpen) {
                window.top.postMessage({ evt: 'hideOverlay', state: 'open' }, document.referrer);
                element.classList.add("open");
                return 'open';
            }
            else {
                window.top.postMessage({ evt: 'hideOverlay', state: 'close' }, document.referrer);
                element.classList.remove("open");
                return 'close';
            }
        };
        this.addTokens = function (tokens) {
            var tokenContainer = document.querySelector('.tk-overlay .token-container');
            _this.addToken(tokenContainer, tokens.map(function (data, index) {
                return _this.createToken(data, index, _this.config.fabButton);
            }).join(''));
        };
        this.addToken = function (tokenContainer, str) {
            tokenContainer.innerHTML = str;
        };
        this.createOverlayMarkup = createOverlayMarkup;
        this.createToken = createToken;
        this.createFabButton = createFabButton;
        this.getTokens = getTokens;
        this.selectedTokenState = [];
    }
    ;
    Object.defineProperty(NegotiatorService.prototype, "configuration", {
        set: function (_a) {
            var filter = _a.filter, tokenName = _a.tokenName, options = _a.options;
            this.filter = filter;
            this.options = options;
            this.config = config[tokenName];
            this.tokenParser = this.config.tokenParser;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NegotiatorService.prototype, "selectedTokens", {
        get: function () { return this.selectedTokenState; },
        set: function (tokens) { this.selectedTokenState = tokens; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    return NegotiatorService;
}());
export default NegotiatorService;
//# sourceMappingURL=negotiatorService.js.map