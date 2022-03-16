import { MessageResponseAction } from '../client/messaging';
var AuthHandler = (function () {
    function AuthHandler(outlet, evtid, tokenDef, tokenObj) {
        this.iframe = null;
        this.iframeWrap = null;
        this.attestationBlob = null;
        this.attestationSecret = null;
        this.outlet = outlet;
        this.evtid = evtid;
        this.base64senderPublicKey = tokenDef.base64senderPublicKey;
        this.base64attestorPubKey = tokenDef.base64attestorPubKey;
        this.signedTokenBlob = tokenObj.ticketBlob;
        this.magicLink = tokenObj.magicLink;
        this.email = tokenObj.email;
        this.signedTokenSecret = tokenObj.ticketSecret;
        this.attestationOrigin = tokenObj.attestationOrigin;
    }
    AuthHandler.prototype.authenticate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.attestationOrigin)
                return reject("Attestation origin is null");
            window.addEventListener("message", function (e) {
                if (!_this.attestationOrigin)
                    return;
                var attestURL = new URL(_this.attestationOrigin);
                if (e.origin !== attestURL.origin) {
                    return;
                }
                if (!_this.iframe || !_this.iframeWrap || !_this.iframe.contentWindow)
                    return;
                _this.postMessageAttestationListener(e, resolve, reject);
            });
            _this.createIframe();
        });
    };
    AuthHandler.prototype.createIframe = function () {
        var _a;
        var iframe = document.createElement('iframe');
        this.iframe = iframe;
        iframe.src = (_a = this.attestationOrigin) !== null && _a !== void 0 ? _a : "";
        iframe.style.width = '800px';
        iframe.style.height = '700px';
        iframe.style.maxWidth = '100%';
        iframe.style.background = '#fff';
        var iframeWrap = document.createElement('div');
        this.iframeWrap = iframeWrap;
        iframeWrap.setAttribute('style', 'width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa');
        iframeWrap.appendChild(iframe);
        document.body.appendChild(iframeWrap);
    };
    AuthHandler.prototype.postMessageAttestationListener = function (event, resolve, reject) {
        console.log('postMessageAttestationListener event (Authenticator)', event);
        if (typeof event.data.ready !== "undefined"
            && event.data.ready === true) {
            var sendData = { force: false };
            if (this.magicLink)
                sendData.magicLink = this.magicLink;
            if (this.email)
                sendData.email = this.email;
            this.iframe.contentWindow.postMessage(sendData, this.attestationOrigin);
            return;
        }
        if (typeof event.data.display !== "undefined") {
            if (event.data.display === true) {
                this.iframeWrap.style.display = 'flex';
                this.outlet.sendMessageResponse({
                    evtid: this.evtid,
                    evt: MessageResponseAction.SHOW_FRAME
                });
            }
            else {
                if (event.data.error) {
                    console.log("Error received from the iframe: " + event.data.error);
                    reject(event.data.error);
                }
                this.iframeWrap.style.display = 'none';
            }
        }
        if (!event.data.hasOwnProperty('attestation')
            || !event.data.hasOwnProperty('requestSecret')) {
            return;
        }
        this.iframeWrap.remove();
        this.attestationBlob = event.data.attestation;
        this.attestationSecret = event.data.requestSecret;
        console.log('attestation data received.');
        console.log(this.attestationBlob);
        console.log(this.attestationSecret);
        console.log(this.base64attestorPubKey);
        try {
            window.authenticator.getUseTicket(this.signedTokenSecret, this.attestationSecret, this.signedTokenBlob, this.attestationBlob, this.base64attestorPubKey, this.base64senderPublicKey).then(function (useToken) {
                if (useToken) {
                    console.log('this.authResultCallback( useToken ): ');
                    resolve(useToken);
                }
                else {
                    console.log('this.authResultCallback( empty ): ');
                    reject(useToken);
                }
            });
        }
        catch (e) {
            console.log("UseDevconTicket. Something went wrong. " + e);
            reject(e);
        }
    };
    return AuthHandler;
}());
export { AuthHandler };
//# sourceMappingURL=auth-handler.js.map