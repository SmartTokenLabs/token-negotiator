import { Buffer } from "buffer";

declare global {
    interface Window {
        DISPLAY_DEBUG_LEVEL: string;
    }
}

export function logger(level: number, ...args: any[]){
	if (!window.DISPLAY_DEBUG_LEVEL || level > parseInt(window.DISPLAY_DEBUG_LEVEL))
		return;
	console.log(...args);
}

export const requiredParams = (item: any, msg: string) => {
  
	if (!item) throw new Error(msg);

}

export function uint8toBuffer(uint8: Uint8Array): any {
	if (typeof Buffer !== "undefined"){
		// node Buffer
		return Buffer.from(uint8);
	} else {
		// browser ArrayBuffer
		return uint8;
	}
}


// shallow equality comparison
export const compareObjects = (o1: any, o2: any) => {
	const keys1 = Object.keys(o1);
	const keys2 = Object.keys(o2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (let key of keys1) {
		// compare commitment (array)
		if (typeof o2[key] === "object") {
			if (JSON.stringify(o1[key]) !== JSON.stringify(o2[key])){
				return false;
			}
		} else if (o1[key] !== o2[key] ) {
			return false;
		}
	}
	return true;

};

export const base64ToUint8array = (base64str: string) => {
  
	base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=');
  
	return Uint8Array.from(Buffer.from(base64str, 'base64'));

}

export const attachPostMessageListener = (listener: any) => {
                
	if (window.addEventListener) {
  
		window.addEventListener("message", listener, false);
  
	} else {
  
		// IE8
		// @ts-ignore
		window.attachEvent("onmessage", listener);
  
	}
}

export const removePostMessageListener = (listener: any) => {

	// @ts-ignore
	if (window.removeEventListener){
		window.removeEventListener("message", listener);
	} else {
		// IE8
		// @ts-ignore
		window.detachEvent("onmessage", listener);
	}
}

/**
 * Function to wait for element to exist.
 * @param selector query selector
 * @returns 
 */
export const waitForElementToExist = (selector: string): Promise<Element> => {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});
		observer.observe(document.body, {childList: true, subtree: true });
	});

}

export type ErrorType = 'warning' | 'info' | 'error';

export const errorHandler = (message: string, type: ErrorType, action?: Function | void, data?: unknown, log = true, throwError = false) => {
	if (log) logger(2, type + ': ' + message);
	if (action) action();
	if (throwError) throw new Error(message);
	return {type, message, data}
}

