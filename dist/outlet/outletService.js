import { readTokens } from '../core';
class OutletService {
    constructor() {
        this.eventReciever = (data) => {
            switch (data.evt) {
                case 'getTokens':
                    const tokens = readTokens(data.localStorageItemName);
                    this.eventSender.emitTokens(tokens);
                    break;
                case 'getTokenProof':
                    const tokenProof = rawTokenCheck(data.unsignedToken);
                    this.eventSender.emitTokens(tokenProof);
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
            emitTokens: (tokenProof) => {
                window.parent.postMessage({
                    evt: 'setTokenProof',
                    tokenProof: tokenProof
                }, "*");
            },
        };
    }
    ;
}
export default OutletService;
