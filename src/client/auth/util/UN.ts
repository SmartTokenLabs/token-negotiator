import { ethers } from 'ethers'
import { sign } from 'tweetnacl'
import { base58ToUint8Array, hexStringToUint8Array, strToHexStr, strToUtfBytes } from '../../../utils'
import * as flowTypes from '@onflow/types'
import * as ecc from 'eosjs-ecc'

export interface UNInterface {
	expiration: number
	domain: string
	randomness: string
	UN: string
	messageToSign: string
	address?: string
	signature?: string
	blockchain?: string
	publicKey?: string
}

export class UN {
	private static DEFAULT_ENDPOINT = 'https://api.smarttokenlabs.com/un'
	private static COMMON_API_KEY =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoidG9rZW4tbmVnb3RpYXRvciIsImlhdCI6MTY4OTc1NzQ4Nn0.ELE1OVvVFY1yrWlbnxtQur6dgeVxmKlPb9LZ_8cMOs8'

	public static async getNewUN(endPoint: string): Promise<UNInterface> {
		try {
			let response
			if (endPoint) {
				response = await fetch(endPoint)
			} else {
				response = await fetch(this.DEFAULT_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-stl-key': this.COMMON_API_KEY,
					},
					body: JSON.stringify({ targetDomain: window.location.origin }),
				})
			}

			return await response.json()
		} catch (e: any) {
			throw new Error('Failed to fetch UN challenge: ' + e.message)
		}
	}

	public static async verifySignature(un: UNInterface) {
		if (!un.signature) throw new Error('Null signature')

		if (un.blockchain === 'ultra') {
			return ecc.verify(un.signature, un.messageToSign, un.publicKey)
		} else if (un.blockchain === 'solana') {
			return await sign.detached.verify(
				strToUtfBytes(un.messageToSign),
				hexStringToUint8Array(un.signature),
				base58ToUint8Array(un.address),
			)
		} else if (un.blockchain === 'flow') {
			const flowProvider = await import('../../../wallet/FlowProvider')
			const fcl = flowProvider.getFlowProvider()

			try {
				const response = await fcl
					.send([
						fcl.script`
        pub fun main(address: Address, sig: String, msg: String): Bool {
            let account = getAccount(address)
            let sig = sig.decodeHex()
            let msg = msg.decodeHex()
            let isValid = false
            var keyNumber = account.keys.count
            var res: Bool = false
            while keyNumber > 0 {
                let accountKey = account.keys.get(keyIndex: Int(keyNumber - 1)) ?? panic("This keyIndex does not exist in this account")
                let key = accountKey.publicKey
                if key.verify(
                    signature: sig, 
                    signedData: msg, 
                    domainSeparationTag: "FLOW-V0.0-user", 
                    hashAlgorithm: HashAlgorithm.SHA3_256
                ) {
                    res = true
                    break
                }
                keyNumber = keyNumber - 1
            }
            return res
        }
        `,
						fcl.args([
							fcl.arg(un.address, flowTypes.Address),
							fcl.arg(un.signature, flowTypes.String),
							fcl.arg(strToHexStr(un.messageToSign), flowTypes.String),
						]),
					])
					.then(fcl.decode)
				if (response) {
					return true
				}
			} catch (e) {
				console.log('Flow address recover error')
			}
			return false
		} else if (!un.blockchain || un.blockchain === 'evm') {
			const msgHash = ethers.utils.hashMessage(un.messageToSign)
			const msgHashBytes = ethers.utils.arrayify(msgHash)
			let recoveredAddr = ethers.utils.recoverAddress(msgHashBytes, un.signature).toLowerCase()
			if (recoveredAddr === un.address.toLowerCase()) {
				return true
			}
		} else {
			throw new Error(`Blockchain "${un.blockchain}" not supported`)
		}
		// we should not be here
		return false
	}

	public static async validateChallenge(endPoint: string, data: UNInterface) {
		const response = await fetch(endPoint, {
			method: 'POST',
			cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data),
		})

		const json = await response.json()

		return json.address
	}
}
