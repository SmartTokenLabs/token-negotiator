import { readTokens } from '../core';
import { base64ToUint8array, compareObjects } from './../utils/index';
var OutletService = (function () {
    function OutletService(config, Authenticator) {
        var _this = this;
        this.eventReciever = function (data) {
            switch (data.evt) {
                case 'getTokens':
                    var tokens = readTokens(data.localStorageItemName);
                    _this.eventSender.emitTokens(tokens);
                    break;
                case 'getTokenProof':
                    _this.rawTokenCheck(data.unsignedToken, _this.config.localStorageItemName, _this.config.tokenParser);
                    break;
            }
        };
        this.eventSender = {
            emitTokens: function (tokens) {
                window.parent.postMessage({
                    evt: 'setTokens',
                    tokens: tokens
                }, "*");
            },
            emitTokenProof: function (tokenProof) {
                window.parent.postMessage({
                    evt: 'setTokenProof',
                    tokenProof: tokenProof
                }, "*");
            },
        };
        if (config && Authenticator) {
            this.config = config;
            this.authenticator = new Authenticator();
        }
        else {
            console.warn('OutletService: Please provide the config and Authenticator to use this module service');
        }
    }
    ;
    OutletService.prototype.rawTokenCheck = function (unsignedToken, localStorageItemName, tokenParser) {
        var _this = this;
        var rawTokenData = this.getRawToken(unsignedToken, localStorageItemName, tokenParser);
        if (!rawTokenData)
            return null;
        var base64ticket = rawTokenData.token;
        var ticketSecret = rawTokenData.secret;
        var tokenObj = {
            ticketBlob: base64ticket,
            ticketSecret: ticketSecret,
            attestationOrigin: this.config.attestationOrigin,
        };
        if (rawTokenData && rawTokenData.id)
            tokenObj.email = rawTokenData.id;
        if (rawTokenData && rawTokenData.magic_link)
            tokenObj.magicLink = rawTokenData.magic_link;
        this.authenticator.getAuthenticationBlob(tokenObj, function () {
            _this.eventSender.emitTokenProof(tokenProof);
        });
    };
    OutletService.prototype.getRawToken = function (unsignedToken, localStorageItemName, tokenParser) {
        var _this = this;
        if (!unsignedToken || !Object.keys(unsignedToken).length)
            return;
        var tokensOutput = readTokens(localStorageItemName);
        if (tokensOutput.success && !tokensOutput.noTokens) {
            var rawTokens = tokensOutput.tokens;
            var token_1 = {};
            if (rawTokens.length) {
                rawTokens.forEach(function (tokenData) {
                    if (tokenData.token) {
                        var decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
                        if (decodedToken && decodedToken[_this.config.unsignedTokenDataName]) {
                            var decodedTokenData = decodedToken[_this.config.unsignedTokenDataName];
                            if (compareObjects(decodedTokenData, unsignedToken))
                                token_1 = tokenData;
                        }
                    }
                });
            }
            return token_1;
        }
        else {
            return null;
        }
    };
    return OutletService;
}());
export default OutletService;
//# sourceMappingURL=outletService.js.map