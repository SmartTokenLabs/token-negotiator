// @ts-nocheck
import { base64ToUint8array } from './../utils';

// core / common negotiator functions.

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
        // @ts-ignore
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
    output.success = false;
  }
  return output;
}

// decode and return tokens
export const decodeTokens = (rawTokens: any, tokenParser: any, unsignedTokenDataName: string) => {
  return rawTokens.map((tokenData: any) => {
    if (tokenData.token) {
      let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
      if (decodedToken && decodedToken[unsignedTokenDataName]) return decodedToken[unsignedTokenDataName];
    }
  });
};

// TODO: Review this type of implementation, which checks the URL is active 
// before creating an Iframe. This does not work via local host without
// some calibration e.g. proxy, extension, changes of security settings of browser.
// export const openOutletIframe = (tokensOrigin: string, localStorageItemName: string) => {
//   return new Promise(function (resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', tokensOrigin);
//     xhr.onload = () => {
//       if (this.status === 200) {
//         const iframe = document.createElement('iframe');
//         iframe.src = tokensOrigin;
//         iframe.style.width = '1px';
//         iframe.style.height = '1px';
//         iframe.style.opacity = '0';
//         document.body.appendChild(iframe);
//         iframe.onload = () => {
//           iframe.contentWindow.postMessage({
//             evt: 'getTokens',
//             localStorageItemName: localStorageItemName
//           }, "*");
//           resolve(true);
//         };
//       } else {
//         reject({
//           status: this.status,
//           statusText: xhr.statusText
//         });
//       }
//     };
//     xhr.onerror = function () {
//       reject({
//         status: this.status,
//         statusText: xhr.statusText
//       });
//     };
//     xhr.send();
//   });
// }
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
      }, tokensOrigin);
      resolve(true);
    };
  });
}

// returns decode and filtered tokens
export const getTokens = async ({
  filter = {},
  tokensOrigin,
  localStorageItemName,
  tokenParser,
  unsignedTokenDataName
}) => {
  return new Promise((resolve, reject) => {
    openOutletIframe(tokensOrigin, localStorageItemName).then(() => {
      window.addEventListener('message', (event) => { 
        if(event.data.evt === 'setTokens') {
          const decodedTokens = decodeTokens(event.data.tokens.tokens, tokenParser, unsignedTokenDataName);
          const filteredTokens = filterTokens(decodedTokens, filter);
          resolve(filteredTokens);
        }
      }, false);
    }).catch((error) => {
      reject({
        error: error
      })
    });
  })
}

export const storeMagicURL = (tokens: any, localStorageItemName: string) => localStorage.setItem(localStorageItemName, JSON.stringify(tokens));

export const readMagicUrl = (tokenUrlName: string, tokenSecretName: string, tokenIdName: string, localStorageItemName: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromQuery = urlParams.get(tokenUrlName);
  const secretFromQuery = urlParams.get(tokenSecretName);
  const idFromQuery = urlParams.get(tokenIdName);
  if (!(tokenFromQuery && secretFromQuery)) return;
  let tokensOutput = readTokens(localStorageItemName);
  let isNewQueryTicket = true;
  const tokens = tokensOutput.tokens.map((tokenData: any) => {
    if (tokenData.token === tokenFromQuery) {
      isNewQueryTicket = false;
    }
  });
  if (isNewQueryTicket) tokens.push({ token: tokenFromQuery, secret: secretFromQuery, id: idFromQuery, magic_link: window.location.href });
  storeMagicURL(tokens, localStorageItemName);
}
