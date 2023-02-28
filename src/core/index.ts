import { base64ToUint8array, compareObjects } from '../utils/index'

interface FilterInterface {
	[key: string]: any
}

export const filterTokens = (decodedTokens: any, filter: FilterInterface = []) => {
	let res: any = []

	if (decodedTokens.length && typeof filter === 'object' && Object.keys(filter).length) {
		let filterKeys = Object.keys(filter)

		decodedTokens.forEach((token: any) => {
			let fitFilter = 1

			filterKeys.forEach((key) => {
				if (token[key] && token[key].toString() !== filter[key].toString()) fitFilter = 0
			})

			if (fitFilter) res.push(token)
		})

		return res
	} else {
		return decodedTokens
	}
}

export const readTokens = (itemStorageKey: any) => {
	const storageTickets = localStorage.getItem(itemStorageKey)

	let tokens: any = []

	let output: any = { tokens: [], noTokens: true, success: true }

	try {
		if (storageTickets && storageTickets.length) {
			tokens = JSON.parse(storageTickets)

			if (tokens.length !== 0) {
				tokens.forEach((item: any) => {
					if (item.token && item.secret) output.tokens.push(item)
				})
			}

			if (output.tokens.length) {
				output.noTokens = false
			}
		}
	} catch (e) {
		output.success = false
	}

	return output
}

export const decodeTokens = (
	rawTokens: any,
	tokenParser: any,
	unsignedTokenDataName: string,
	includeSignedToken = false,
) => {
	const x = JSON.parse(rawTokens)

	if (x.length) {
		return x.map((tokenData: any) => {
			if (tokenData.token) {
				return decodeToken(tokenData, tokenParser, unsignedTokenDataName, includeSignedToken)
			}
		})
	} else {
		return []
	}
}

export const decodeToken = (
	tokenData: any,
	tokenParser: any,
	unsignedTokenDataName: string,
	includeSignedToken = false,
) => {
	if (tokenData.token) {
		let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer)

		if (decodedToken && decodedToken[unsignedTokenDataName]) {
			let token = decodedToken[unsignedTokenDataName]

			token = propsArrayBufferToArray(token)

			return includeSignedToken ? { signedToken: tokenData.token, ...token } : token
		}
	}
}

function propsArrayBufferToArray(obj: any) {
	Object.keys(obj).forEach((key) => {
		if (obj[key] instanceof ArrayBuffer) {
			obj[key] = Array.from(new Uint8Array(obj[key]))
		}
	})
	return obj
}

export const storeMagicURL = (tokens: any, itemStorageKey: string) => {
	if (tokens) {
		localStorage.setItem(itemStorageKey, JSON.stringify(tokens))
	}
}

export const readTokenFromMagicUrl = (
	tokenUrlName: string,
	tokenSecretName: string,
	tokenIdName: string,
	urlParams: URLSearchParams | null = null,
) => {
	if (urlParams === null) urlParams = new URLSearchParams(window.location.search)

	const tokenFromQuery = urlParams.get(tokenUrlName)

	const secretFromQuery = urlParams.get(tokenSecretName)

	let tmp = urlParams.get(tokenIdName)
	const idFromQuery = tmp ? tmp : ''

	if (!(tokenFromQuery && secretFromQuery)) throw new Error('Incomplete token params in URL.')

	return {
		token: tokenFromQuery,
		secret: secretFromQuery,
		id: decodeURIComponent(idFromQuery),
		magic_link: window.location.href,
	}
}

export const rawTokenCheck = async (unsignedToken: any, tokenIssuer: any) => {
	// currently meta mask is needed to move beyond this point.
	// however the err msg given is not obvious that this is the issue.

	// metamask is only one of the wallets, we have to use walletConnect to
	// check if user have some wallet immediately before use wallet
	// requiredParams(window.ethereum, "Please install metamask to continue.");

	let rawTokenData = getRawToken(unsignedToken, tokenIssuer)

	if (!rawTokenData) return null

	// @ts-ignore
	let base64ticket = rawTokenData.token

	// @ts-ignore
	let ticketSecret = rawTokenData.secret

	let tokenObj = {
		ticketBlob: base64ticket,
		ticketSecret: ticketSecret,
		attestationOrigin: tokenIssuer.attestationOrigin,
	}

	// @ts-ignore
	if (rawTokenData && rawTokenData.id) tokenObj.email = rawTokenData.id

	// @ts-ignore
	if (rawTokenData && rawTokenData.magic_link) {
		// @ts-ignore
		tokenObj.magicLink = rawTokenData.magic_link
	}

	// @ts-ignore
	if (tokenIssuer.attestationInTab) tokenObj.attestationInTab = true

	return tokenObj
}

export const getRawToken = (unsignedToken: any, tokenIssuer: any) => {
	if (!unsignedToken || !Object.keys(unsignedToken).length) return

	let tokensOutput = readTokens(tokenIssuer.itemStorageKey)

	if (tokensOutput.success && !tokensOutput.noTokens) {
		let rawTokens = tokensOutput.tokens

		let token = {}

		if (rawTokens.length) {
			rawTokens.forEach((tokenData: any) => {
				if (tokenData.token) {
					const _tokenParser = tokenIssuer.tokenParser

					let decodedToken = new _tokenParser(base64ToUint8array(tokenData.token).buffer)

					if (decodedToken && decodedToken[tokenIssuer.unsignedTokenDataName]) {
						let decodedTokenData = decodedToken[tokenIssuer.unsignedTokenDataName]
						decodedTokenData = propsArrayBufferToArray(decodedTokenData)

						if (compareObjects(decodedTokenData, unsignedToken)) {
							token = tokenData
						}
					}
				}
			})
		}

		return token
	}

	return null
}
