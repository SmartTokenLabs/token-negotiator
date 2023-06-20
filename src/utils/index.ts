import { URLNS } from '../core/messaging'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { sha256 } from 'ethers/lib/utils'
import { OffChainTokenConfig } from '../client/interface'
import { OutletIssuerInterface } from '../outlet'

export interface IssuerHashMap {
	[collectionId: string]: string[]
}

declare global {
	interface Window {
		DISPLAY_DEBUG_LEVEL: string
	}
}

export function logger(level: number, ...args: any[]) {
	// if (!window.DISPLAY_DEBUG_LEVEL || level > parseInt(window.DISPLAY_DEBUG_LEVEL)) return
	console.log(...args)
}

export const requiredParams = (item: any, msg: string) => {
	if (!item) throw new Error(msg)
}

export const compareObjects = (o1: any, o2: any) => {
	const keys1 = Object.keys(o1)
	const keys2 = Object.keys(o2)
	if (keys1.length !== keys2.length) {
		return false
	}
	for (let key of keys1) {
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

	return Uint8Array.from(atob(base64str), (c) => c.charCodeAt(0))
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

export const errorHandler = (error: any, type: ErrorType, action?: Function | null, data?: unknown, log = true, throwError = false) => {
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
export const removeUrlSearchParams = (params: URLSearchParams, additionalParams: string[] = [], namespace: string | null = URLNS) => {
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

export const base58ToUint8Array = (base58String) => {
	const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
	const base = alphabet.length
	const bytes = [0]
	for (let i = 0; i < base58String.length; i++) {
		const char = base58String[i]
		const charIndex = alphabet.indexOf(char)
		if (charIndex === -1) throw new Error(`Invalid Base58 character '${char}'`)
		for (let j = 0; j < bytes.length; j++) bytes[j] *= base
		bytes[0] += charIndex
		let carry = 0
		for (let j = 0; j < bytes.length; j++) {
			bytes[j] += carry
			carry = bytes[j] >> 8
			bytes[j] &= 0xff
		}
		while (carry) {
			bytes.push(carry & 0xff)
			carry >>= 8
		}
	}
	return new Uint8Array(bytes.reverse())
}

export const strToHexStr = (str: string): string => {
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(str).toString('hex')
	} else {
		return Array.from(strToUtfBytes(str))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('')
	}
}

export const strToUtfBytes = (str: string): Uint8Array => {
	const encoder = new TextEncoder()
	return encoder.encode(str)
}

export const hexStringToUint8Array = (hexString: string): Uint8Array => {
	if (hexString.length % 2 === 1) {
		throw new Error('Wrong Hex String')
	}
	const uint8Array = new Uint8Array(hexString.length / 2)

	for (let i = 0; i < hexString.length; i += 2) {
		uint8Array[i / 2] = parseInt(hexString.slice(i, i + 2), 16)
	}
	return uint8Array
}

export const createIssuerHashMap = (issuers: OffChainTokenConfig[]): IssuerHashMap => {
	const hashObj = {}

	for (const issuer of issuers) {
		hashObj[issuer.collectionID] = createIssuerHashArray(issuer)
	}

	return hashObj
}

// output per issuer base64senderPublicKey
// [
// 	'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
// 	'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
// ]
export const createIssuerHashArray = (issuer: OffChainTokenConfig | OutletIssuerInterface) => {
	const hashes = []

	const keysArr = KeyPair.parseKeyArrayStrings(issuer.base64senderPublicKeys)

	for (let [eventId, keys] of Object.entries(keysArr)) {
		if (!Array.isArray(keys)) keys = [keys]

		for (const key of keys) {
			hashes.push(createOffChainCollectionHash(key, eventId))
		}
	}

	return hashes
}

// output: 32 byte hash
export const createOffChainCollectionHash = (key: KeyPair, eventId: string) => {
	const encoder = new TextEncoder()
	return sha256(encoder.encode(key.getPublicKeyAsHexStr() + '-' + eventId))
}
