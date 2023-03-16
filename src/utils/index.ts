import { URLNS } from '../core/messaging'

declare global {
	interface Window {
		DISPLAY_DEBUG_LEVEL: string
	}
}

export function logger(level: number, ...args: any[]) {
	if (!window.DISPLAY_DEBUG_LEVEL || level > parseInt(window.DISPLAY_DEBUG_LEVEL)) return
	console.log(...args)
}

export const requiredParams = (item: any, msg: string) => {
	if (!item) throw new Error(msg)
}

// shallow equality comparison
export const compareObjects = (o1: any, o2: any) => {
	const keys1 = Object.keys(o1)
	const keys2 = Object.keys(o2)
	if (keys1.length !== keys2.length) {
		return false
	}
	for (let key of keys1) {
		// compare commitment (array)
		if (typeof o2[key] === 'object') {
			if (JSON.stringify(o1[key]) !== JSON.stringify(o2[key])) {
				return false
			}
		} else if (o1[key] !== o2[key]) {
			return false
		}
	}
	return true
}

export const base64ToUint8array = (base64str: string) => {
	base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=')

	return Uint8Array.from(Buffer.from(base64str, 'base64'))
}

export const attachPostMessageListener = (listener: any) => {
	if (window.addEventListener) {
		window.addEventListener('message', listener, false)
	} else {
		// IE8
		// @ts-ignore
		window.attachEvent('onmessage', listener)
	}
}

export const removePostMessageListener = (listener: any) => {
	// @ts-ignore
	if (window.removeEventListener) {
		window.removeEventListener('message', listener)
	} else {
		// IE8
		// @ts-ignore
		window.detachEvent('onmessage', listener)
	}
}

/**
 * Function to wait for element to exist.
 * @param selector query selector
 * @returns
 */
export const waitForElementToExist = (selector: string): Promise<Element> => {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector))
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector))
				observer.disconnect()
			}
		})
		observer.observe(document.body, { childList: true, subtree: true })
	})
}

export type ErrorType = 'warning' | 'info' | 'error'

export const errorHandler = (
	error: any,
	type: ErrorType,
	action?: Function | null,
	data?: unknown,
	log = true,
	throwError = false,
) => {
	let errorMsg

	if (typeof error === 'object') {
		errorMsg = error.message ?? 'Unknown error type: ' + JSON.stringify(error)
	} else {
		errorMsg = error
	}

	if (log) logger(2, type + ': ' + errorMsg)

	if (action) action()

	if (throwError) {
		throw new NegotiatorError(errorMsg, error)
	}

	return { type, message: error, data }
}

export class NegotiatorError extends Error {
	constructor(message: string, public originalError: any, public code?: string) {
		super(message)
	}
}

export const tokenRequest = async (query: string, silenceRequestError: boolean) => {
	try {
		const response = await fetch(query)
		const ok = response.status >= 200 && response.status <= 299
		if (!ok && silenceRequestError === true) {
			console.warn('token api request failed: ', query)
			return
		}
		if (ok) return response.json()
		else throw new Error(`HTTP error! status: ${response.status}`)
	} catch (msg: any) {
		throw new Error(`HTTP error.`)
	}
}

/**
 * Remove callback parameters from the URL by providing a list of keys or a namespace (key prefix)
 * @param params
 * @param additionalParams
 * @param namespace
 */
export const removeUrlSearchParams = (
	params: URLSearchParams,
	additionalParams: string[] = [],
	namespace: string | null = URLNS,
) => {
	if (namespace)
		for (let key of Array.from(params.keys())) {
			// Iterator needs to be converted to array since we are deleting keys
			if (key.indexOf(namespace) === 0) params.delete(key)
		}

	for (let paramName of additionalParams) {
		if (params.has(paramName)) params.delete(paramName)
	}

	return params
}
