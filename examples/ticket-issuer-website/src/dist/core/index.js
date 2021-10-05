import { base64ToUint8array } from './../utils';
export const filterTokens = (decodedTokens, filter = {}) => {
    if (Object.keys(filter).length === 0)
        filter = filter;
    let res = [];
    if (decodedTokens.length
        && typeof filter === "object"
        && Object.keys(filter).length) {
        let filterKeys = Object.keys(filter);
        decodedTokens.forEach((token) => {
            let fitFilter = 1;
            filterKeys.forEach(key => {
                if (token[key].toString() !== filter[key].toString())
                    fitFilter = 0;
            });
            if (fitFilter)
                res.push(token);
        });
        return res;
    }
    else {
        return decodedTokens;
    }
};
export const readTokens = (localStorageItemName) => {
    const storageTickets = localStorage.getItem(localStorageItemName);
    let tokens = [];
    let output = { tokens: [], noTokens: true, success: true };
    try {
        if (storageTickets && storageTickets.length) {
            tokens = JSON.parse(storageTickets);
            if (tokens.length !== 0) {
                tokens.forEach((item) => {
                    if (item.token && item.secret)
                        output.tokens.push(item);
                });
            }
            if (output.tokens.length) {
                output.noTokens = false;
            }
        }
    }
    catch (e) {
        console.log('Cant parse tokens in LocalStorage');
        if (typeof callBack === "function") {
            output.success = false;
        }
    }
    return output;
};
export const decodeTokens = (rawTokens, tokenParser, unsignedTokenDataName) => {
    return rawTokens.map((tokenData) => {
        if (tokenData.token) {
            let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
            if (decodedToken && decodedToken[unsignedTokenDataName])
                return decodedToken[unsignedTokenDataName];
        }
    });
};
export const openOutletIframe = (tokensOrigin, localStorageItemName) => {
    return new Promise((resolve, reject) => {
        const iframe = document.createElement('iframe');
        iframe.src = tokensOrigin;
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        document.body.appendChild(iframe);
        iframe.onload = () => {
            iframe.contentWindow.postMessage({
                evt: 'getTokens',
                localStorageItemName: localStorageItemName
            }, "*");
            resolve(true);
        };
    });
};
export const getTokens = async ({ filter = {}, tokenName = "devcon-ticket", tokensOrigin = "http://localhost:3002/", localStorageItemName = "dcTokens", tokenParser, unsignedTokenDataName }) => {
    return new Promise((resolve, reject) => {
        window.addEventListener('message', function (event) {
            if (event.data.evt === 'setTokens') {
                const decodedTokens = decodeTokens(event.data.tokens.tokens, tokenParser, unsignedTokenDataName);
                const filteredTokens = filterTokens(decodedTokens, filter);
                resolve(filteredTokens);
            }
        }, false);
        openOutletIframe(tokensOrigin, localStorageItemName);
    });
};
export const storeMagicURL = (tokens, localStorageItemName) => localStorage.setItem(localStorageItemName, JSON.stringify(tokens));
export const readMagicUrl = (tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName) => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = urlParams.get(tokenUrlName);
    const secretFromQuery = urlParams.get(tokenSecretName);
    const idFromQuery = urlParams.get(tokenIdName);
    if (!(tokenFromQuery && secretFromQuery))
        return;
    let tokensOutput = readTokens(localStorageItemName);
    let isNewQueryTicket = true;
    const tokens = tokensOutput.tokens.map((tokenData) => {
        if (tokenData.token === tokenFromQuery) {
            isNewQueryTicket = false;
        }
    });
    if (isNewQueryTicket)
        tokens.push({ token: tokenFromQuery, secret: secretFromQuery, id: idFromQuery, magic_link: window.location.href });
    storeMagicURL(tokens, localStorageItemName);
};
