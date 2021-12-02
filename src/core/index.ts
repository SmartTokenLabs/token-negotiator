// @ts-nocheck
import { base64ToUint8array, getCookie } from './../utils/index';

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
  // const storageTickets = localStorage.getItem(localStorageItemName);
  const storageTickets = getCookie(localStorageItemName);
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
    output.success = false;
  }
  return output;
}

// decode and return tokens
export const decodeTokens = (rawTokens: any, tokenParser: any, unsignedTokenDataName: string) => {
  var x = JSON.parse(rawTokens);
  return x.map((tokenData: any) => {
    if (tokenData.token) {
      let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
      if (decodedToken && decodedToken[unsignedTokenDataName]) return decodedToken[unsignedTokenDataName];
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
      
      // TODO: See what is required at this stage. It maybe that no action is required and cookies can be read
      // document.cookie = `dcTokens=[{"token":"MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"10593082611958123069159986522878346963005475009650354554005852930286854271222","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=10593082611958123069159986522878346963005475009650354554005852930286854271222&id=nicktaras@hotmail.co.uk"},{"token":"MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=","secret":"285996413010999512790264856198259265088323878963947294417758116344175800611","id":"nicktaras83@gmail.com","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=&secret=285996413010999512790264856198259265088323878963947294417758116344175800611&id=nicktaras83@gmail.com"},{"token":"MIGSMAkMATkCAQECAQwEQQQKeUkXpYEfS-G_OAq85nQHD5WM39T_Ol00r-4QKLwPmgl0JnCBEyb8AVruuSVqcEgvSiDu2TTIXLwdMJ6BgrUmA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"12719637406806243654230339844700051509369597731121204155497188964317169703492","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQKeUkXpYEfS-G_OAq85nQHD5WM39T_Ol00r-4QKLwPmgl0JnCBEyb8AVruuSVqcEgvSiDu2TTIXLwdMJ6BgrUmA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=12719637406806243654230339844700051509369597731121204155497188964317169703492&id=nicktaras@hotmail.co.uk"}]; max-age=31536000; SameSite=None;`;

      resolve(true);
    };
  });
}
// export const openOutletIframe = (tokensOrigin, localStorageItemName) => {
//   return new Promise((resolve, reject) => {
//     const iframe = document.createElement('iframe');
//     iframe.src = tokensOrigin;
//     iframe.style.width = '1px';
//     iframe.style.height = '1px';
//     iframe.style.opacity = '0';
//     document.body.appendChild(iframe);
//     iframe.onload = () => {
//       iframe.contentWindow.postMessage({
//         evt: 'getTokens',
//         localStorageItemName: localStorageItemName
//       }, tokensOrigin);
//       resolve(true);
//     };
//   });
// }

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
      const tokens = getCookie(localStorageItemName);
      const decodedTokens = decodeTokens(tokens, tokenParser, unsignedTokenDataName);
      const filteredTokens = filterTokens(decodedTokens, filter);
      resolve(filteredTokens);
    }).catch((error) => {
      reject({
        error: error
      })
    });
  })
}
// export const getTokens = async ({
//   filter = {},
//   tokensOrigin,
//   localStorageItemName,
//   tokenParser,
//   unsignedTokenDataName
// }) => {
//   return new Promise((resolve, reject) => {
//     openOutletIframe(tokensOrigin, localStorageItemName).then(() => {
//       window.addEventListener('message', (event) => { 
//         if(event.data.evt === 'setTokens') {
//           const decodedTokens = decodeTokens(event.data.tokens.tokens, tokenParser, unsignedTokenDataName);
//           const filteredTokens = filterTokens(decodedTokens, filter);
//           resolve(filteredTokens);
//         }
//       }, false);
//     }).catch((error) => {
//       reject({
//         error: error
//       })
//     });
//   })
// }

// export const storeMagicURL = (tokens: any, localStorageItemName: string) => localStorage.setItem(localStorageItemName, JSON.stringify(tokens));
export const storeMagicURL = (tokens: any, localStorageItemName: string) => {
  // localStorage.setItem(localStorageItemName, JSON.stringify(tokens));
  // document.cookie = `${localStorageItemName}=[{"token":"MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"10593082611958123069159986522878346963005475009650354554005852930286854271222","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=10593082611958123069159986522878346963005475009650354554005852930286854271222&id=nicktaras@hotmail.co.uk"},{"token":"MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=","secret":"285996413010999512790264856198259265088323878963947294417758116344175800611","id":"nicktaras83@gmail.com","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=&secret=285996413010999512790264856198259265088323878963947294417758116344175800611&id=nicktaras83@gmail.com"},{"token":"MIGSMAkMATkCAQECAQwEQQQKeUkXpYEfS-G_OAq85nQHD5WM39T_Ol00r-4QKLwPmgl0JnCBEyb8AVruuSVqcEgvSiDu2TTIXLwdMJ6BgrUmA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"12719637406806243654230339844700051509369597731121204155497188964317169703492","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQKeUkXpYEfS-G_OAq85nQHD5WM39T_Ol00r-4QKLwPmgl0JnCBEyb8AVruuSVqcEgvSiDu2TTIXLwdMJ6BgrUmA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=12719637406806243654230339844700051509369597731121204155497188964317169703492&id=nicktaras@hotmail.co.uk"}]; max-age=31536000; SameSite=None;`;
  document.cookie = `${localStorageItemName}=${JSON.stringify(tokens)}; max-age=31536000; SameSite=None; Secure`;
}

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
