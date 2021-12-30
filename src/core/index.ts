import { base64ToUint8array, getCookie, requiredParams, compareObjects } from '../utils/index';
import { ethers } from "ethers";

interface FilterInterface {
  [key: string]: any
}

export const filterTokens = (decodedTokens: any, filter:FilterInterface) => {
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

export const readTokens = (itemStorageKey: any) => {
  const storageTickets = getCookie(itemStorageKey);
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

export const decodeTokens = (rawTokens: any, tokenParser: any, unsignedTokenDataName: string) => {
  var x = JSON.parse(rawTokens);
  if(x.length) {
    return x.map((tokenData: any) => {
      if (tokenData.token) {
        let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
        if (decodedToken && decodedToken[unsignedTokenDataName]) return decodedToken[unsignedTokenDataName];
      }
    });
  } else {
    return [];
  }
};

export const openOutletIframe = (tokensOrigin: any) => {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.src = tokensOrigin;
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = '0';
    document.body.appendChild(iframe);
    iframe.onload = () => {
      resolve(true);
    };
  });
}

interface GetTokenInterface {
  filter:any;
  tokensOrigin:any;
  itemStorageKey:any;
  tokenParser:any;
  unsignedTokenDataName:any;
}

export const getTokens = async (config:GetTokenInterface) => {
  const { 
    filter,
    tokensOrigin,
    itemStorageKey,
    tokenParser,
    unsignedTokenDataName
  } = config;
  return new Promise((resolve, reject) => {
    openOutletIframe(tokensOrigin).then(() => {
      const tokens = getCookie(itemStorageKey);
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

export const storeMagicURL = (tokens: any, itemStorageKey: string) => {
  if(tokens){
    document.cookie = `${itemStorageKey}=${JSON.stringify(tokens)}; max-age=31536000; SameSite=None; Secure`;
  }
}

export const readMagicUrl = (tokenUrlName: string, tokenSecretName: string, tokenIdName: string, itemStorageKey: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromQuery = urlParams.get(tokenUrlName);
  const secretFromQuery = urlParams.get(tokenSecretName);
  const idFromQuery = urlParams.get(tokenIdName);
  if (!(tokenFromQuery && secretFromQuery)) return;
  let tokensOutput = readTokens(itemStorageKey);
  let isNewQueryTicket = true;
  const tokens = tokensOutput.tokens.map((tokenData: any) => {
    if (tokenData.token === tokenFromQuery) {
      isNewQueryTicket = false;
    }
  });
  if (isNewQueryTicket) tokens.push({ token: tokenFromQuery, secret: secretFromQuery, id: idFromQuery, magic_link: window.location.href });
  return tokens;
}


export const ethKeyIsValid = (ethKey: any) => {

  return ethKey.expiry >= Date.now();

}

export const validateUseEthKey = async (endPoint: string, data: any) => {

  try {

      const response = await fetch(endPoint, {
          method: 'POST',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
      });

      const json = await response.json();

      return json.address;

  } catch (e) {
      
      return {
          success: false,
          message: "validate ethkey request failed"
      }

  }

}

export const getUnpredictableNumber = async (endPoint: string) => {

  try {

      const response = await fetch(endPoint);
      
      const json = await response.json();
      
      json.success = true;
      
      return json;

  } catch (e) {
      
      return {
          success: false,
          message: "UN request failed"
      }

  }

}

export const getChallengeSigned = async (tokenIssuer: any) => {

  const storageEthKeys = localStorage.getItem(tokenIssuer.ethKeyitemStorageKey);

  let ethKeys = (storageEthKeys && storageEthKeys.length) ? JSON.parse(storageEthKeys) : {};

  try {
  
      let address = await connectMetamaskAndGetAddress();
      
      address = address.toLowerCase();
      
      let useEthKey;

      if (ethKeys && ethKeys[address] && !ethKeyIsValid(ethKeys[address])) {

          delete ethKeys[address];

      }

      if (ethKeys && ethKeys[address]) {

          useEthKey = ethKeys[address];

      } else {

          useEthKey = await signNewChallenge(tokenIssuer.unEndPoint);

          if (useEthKey) {

              ethKeys[useEthKey.address.toLowerCase()] = useEthKey;

              localStorage.setItem(tokenIssuer.ethKeyitemStorageKey, JSON.stringify(ethKeys));

          }

      }
      
      return useEthKey;

  } catch (e:any) {

      throw new Error(e);

  }
}

export const connectMetamaskAndGetAddress = async () => {

  requiredParams(window.ethereum, 'Please install metamask to continue.');

  const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });

  if (!userAddresses || !userAddresses.length) throw new Error("Active Wallet required");

  return userAddresses[0];

}

export const getTokenProof = (unsignedToken: any, tokenIssuer:any) => {
  
  return rawTokenCheck(unsignedToken, tokenIssuer);

}

export const signNewChallenge = async (unEndPoint: string) => {

  let res = await getUnpredictableNumber(unEndPoint);

  const { number: UN, randomness, domain, expiration: expiry, messageToSign } = res;

  let signature = await signMessageWithBrowserWallet(messageToSign);

  const msgHash = ethers.utils.hashMessage(messageToSign);

  const msgHashBytes = ethers.utils.arrayify(msgHash);

  const recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signature);

  return {
      address: recoveredAddress,
      expiry,
      domain,
      randomness,
      signature,
      UN
  };
}

export const signMessageWithBrowserWallet = async (message: any) => {

  await connectMetamaskAndGetAddress();

  let provider = new ethers.providers.Web3Provider(window.ethereum);

  let signer = provider.getSigner();

  return await signer.signMessage(message);

}

export const rawTokenCheck = async (unsignedToken: any, tokenIssuer:any) => {

  let rawTokenData = getRawToken(unsignedToken, tokenIssuer);

  if (!rawTokenData) return null;

  // @ts-ignore
  let base64ticket = rawTokenData.token;

  // @ts-ignore
  let ticketSecret = rawTokenData.secret;

  let tokenObj = {
      ticketBlob: base64ticket,
      ticketSecret: ticketSecret,
      attestationOrigin: tokenIssuer.attestationOrigin,
  };

  // @ts-ignore
  if (rawTokenData && rawTokenData.id) tokenObj.email = rawTokenData.id;
      
  // @ts-ignore
  if (rawTokenData && rawTokenData.magic_link) tokenObj.magicLink = rawTokenData.magic_link;

  return new Promise((resolve, reject) => {
      
      // @ts-ignore
      // this.authenticator.getAuthenticationBlob(tokenObj, (tokenProof) => {
      //     resolve(tokenProof);
      // })

    });

}

export const getRawToken = (unsignedToken: any, tokenIssuer:any) => {

  if (!unsignedToken || !Object.keys(unsignedToken).length) return;

  let tokensOutput = readTokens(tokenIssuer.itemStorageKey);

  if (tokensOutput.success && !tokensOutput.noTokens) {

      let rawTokens = tokensOutput.tokens;

      let token = {};

      if (rawTokens.length) {

          rawTokens.forEach((tokenData: any) => {

              if (tokenData.token) {

                  const _tokenParser = tokenIssuer.tokenParser;

                  let decodedToken = new _tokenParser(base64ToUint8array(tokenData.token).buffer);

                  if (decodedToken && decodedToken[tokenIssuer.unsignedTokenDataName]) {

                      let decodedTokenData = decodedToken[tokenIssuer.unsignedTokenDataName];

                      if (compareObjects(decodedTokenData, unsignedToken)) token = tokenData;

                  }

              }

          });
      }

      return token;

  } else {

      return null;

  }
}