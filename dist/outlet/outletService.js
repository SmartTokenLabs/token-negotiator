import { readTokens } from '../core';
import { base64ToUint8array, compareObjects } from './../utils/index';
class OutletService {
    constructor(config, Authenticator) {
        this.eventReciever = (data) => {
            switch (data.evt) {
                case 'getTokens':
                    const tokens = readTokens(data.localStorageItemName);
                    this.eventSender.emitTokens(tokens);
                    break;
                case 'getTokenProof':
                    this.rawTokenCheck(data.unsignedToken, this.config.localStorageItemName, this.config.tokenParser);
                    break;
            }
        };
        this.eventSender = {
            emitTokens: (tokens) => {
                window.parent.postMessage({
                    evt: 'setTokens',
                    tokens: tokens
                }, "*");
            },
            emitTokenProof: (tokenProof) => {
                window.parent.postMessage({
                    evt: 'setTokenProof',
                    tokenProof: tokenProof
                }, "*");
            },
        };
        if (!config || !Authenticator)
            throw new Error('OutletService: Please provide the config and Authenticator to use this module service');
        this.config = config;
        this.authenticator = new Authenticator();
    }
    ;
    rawTokenCheck(unsignedToken, localStorageItemName, tokenParser) {
        let rawTokenData = this.getRawToken(unsignedToken, localStorageItemName, tokenParser);
        if (!rawTokenData)
            return null;
        let base64ticket = rawTokenData.token;
        let ticketSecret = rawTokenData.secret;
        let tokenObj = {
            ticketBlob: base64ticket,
            ticketSecret: ticketSecret,
            attestationOrigin: this.config.attestationOrigin,
        };
        if (rawTokenData && rawTokenData.id)
            tokenObj.email = rawTokenData.id;
        if (rawTokenData && rawTokenData.magic_link)
            tokenObj.magicLink = rawTokenData.magic_link;
        this.authenticator.getAuthenticationBlob(tokenObj, () => {
            this.eventSender.emitTokenProof(tokenProof);
        });
    }
    getRawToken(unsignedToken, localStorageItemName, tokenParser) {
        if (!unsignedToken || !Object.keys(unsignedToken).length)
            return;
        let tokensOutput = readTokens(localStorageItemName);
        if (tokensOutput.success && !tokensOutput.noTokens) {
            let rawTokens = tokensOutput.tokens;
            let token = {};
            if (rawTokens.length) {
                rawTokens.forEach(tokenData => {
                    if (tokenData.token) {
                        let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
                        if (decodedToken && decodedToken[this.config.unsignedTokenDataName]) {
                            let decodedTokenData = decodedToken[this.config.unsignedTokenDataName];
                            if (compareObjects(decodedTokenData, unsignedToken))
                                token = tokenData;
                        }
                    }
                });
            }
            return token;
        }
        else {
            return null;
        }
    }
}
export default OutletService;
