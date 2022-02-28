import { Buffer } from "buffer";

export const logger = (item:any) => {
  
  console.log(item);

};

export const requiredParams = (item:any, msg:string) => {
  
  if (!item) throw new Error(msg);

}

// shallow equality comparison
export const compareObjects = (o1: any, o2: any) => {
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (o1[key] !== o2[key]) {
      return false;
    }
  }
  return true;

};

export const base64ToUint8array = (base64str: string) => {
  
  base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=');
  
  return Uint8Array.from(Buffer.from(base64str, 'base64'));

}

export const asyncHandle = async (promise:any) => {
  
  try {
  
    const data = await promise;
  
    return [data, undefined];
  
  } catch (error) {
  
    return [undefined, error];
  }
  
}

export const attachPostMessageListener = (listener:any) => {
                
  if (window.addEventListener) {
  
      window.addEventListener("message", listener, false);
  
  } else {
  
      // IE8
  
      // @ts-ignore
      window.attachEvent("onmessage", listener);
  
  }
}

export const splitOnChainKey = (onChainKey: string) => {
  const splitData = onChainKey.split('.');
  return { 
    address: splitData[0],
    chain: splitData[1],
    openSeaSlug: splitData[2]
  } 
}