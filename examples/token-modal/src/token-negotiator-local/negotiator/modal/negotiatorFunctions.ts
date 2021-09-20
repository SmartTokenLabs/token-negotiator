// @ts-ignore
import { base64ToUint8array } from './../utils';

// negotiator functions.

// recieves decoded tokens, returns filtered list.
export const filterTokens = (decodedTokens: any, filter = {}) => {
  // @ts-ignore
  if (Object.keys(filter).length === 0) filter = filter;
  let res: any = [];
  if (
    decodedTokens.length
    && typeof filter === "object"
    && Object.keys(filter).length
  ) {
    let filterKeys = Object.keys(filter);
    decodedTokens.forEach((token: any) => {
      let fitFilter = 1;
      filterKeys.forEach(key => {
        if (token[key].toString() !== filter[key].toString()) fitFilter = 0;
      })
      if (fitFilter) res.push(token);
    })
    return res;
  } else {
    return decodedTokens;
  }
}

// recieves localstorage token reference tokens, returns filtered list.
export const readTokens = (localStorageItemName: any) => {
  const storageTickets = localStorage.getItem(localStorageItemName);
  let tokens: any = [];
  let output: any = { tokens: [], noTokens: true, success: true };
  try {
    if (storageTickets && storageTickets.length) {
      tokens = JSON.parse(storageTickets);
      if (tokens.length !== 0) {
        tokens.forEach((item: any) => {
          if (item.token && item.secret) output.tokens.push(item);
        })
      }
      if (output.tokens.length) {
        output.noTokens = false;
      }
    }
  } catch (e) {
    console.log('Cant parse tokens in LocalStorage');
    // @ts-ignore
    if (typeof callBack === "function") {
      output.success = false;
    }
  }
  return output;
}

export const decodeTokens = (rawTokens: any, tokenParser, unsignedTokenDataName: string) => {
  return rawTokens.map((tokenData: any) => {
    if (tokenData.token) {
      let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
      if (decodedToken && decodedToken[unsignedTokenDataName]) return decodedToken[unsignedTokenDataName];
    }
  });
};

export const getTokens = async ({
  filter = {},
  tokenName = "devcon-ticket",
  tokensOrigin = "http://localhost:3002/",
  localStorageItemName = "dcTokens",
  tokenParser,
  unsignedTokenDataName
}) => {
  return new Promise((resolve, reject) => {
    if (window.location.href === tokensOrigin) {
      const tokensOutput = readTokens(localStorageItemName);
      if (tokensOutput.success && !tokensOutput.noTokens) {
        const decodedTokens = decodeTokens(tokensOutput.tokens, tokenParser, unsignedTokenDataName);
        const filteredTokens = filterTokens(decodedTokens, filter);
        tokensOutput.tokens = filteredTokens;
        resolve(tokensOutput);
      } else {
        reject(false);
      }
    }
  })
}