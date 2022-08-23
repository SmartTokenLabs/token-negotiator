import {KeyStore} from "@tokenscript/attestation/dist/safe-connect/KeyStore";
import {uint8tohex} from "@tokenscript/attestation/dist/libs/utils";
import {EthereumKeyLinkingAttestation} from "@tokenscript/attestation/dist/safe-connect/EthereumKeyLinkingAttestation";

export interface ChallengeInterface {
	expiry: number;
	messageToSign: string;
	address: string;
	signature?: string;
}

export interface ProofRequestInterface {
	type: string;
	subject: string;
	signature: string;
	address: string;
	data?: any;
}

export interface ProofResponseInterface {
	type: string;
	expiry: number;
	data?: any;
}

export class SafeConnect {

	public static HOLDING_KEY_ALGORITHM = "RSASSA-PKCS1-v1_5";

	public static keyStore = new KeyStore();

	public static async getLinkPrivateKey(){
		let keys = await SafeConnect.keyStore.getOrCreateKey(SafeConnect.HOLDING_KEY_ALGORITHM);
		return keys.attestHoldingKey.privateKey;
	}

	public static async getLinkPublicKey(){
		let keys = await SafeConnect.keyStore.getOrCreateKey(SafeConnect.HOLDING_KEY_ALGORITHM);
		return uint8tohex(keys.holdingPubKey);
	}

	public static async getChallenge(safeConnectUrl: string, address: string){
		try {
			return await this.apiRequest(safeConnectUrl, "POST", "get-challenge", { address: address }) as ChallengeInterface
		} catch (e) {
			throw new Error("Failed to get address challenge: " + e.message);
		}
	}

	public static async getAttestation(safeConnectUrl: string, serverPayload: ProofRequestInterface){
		try {
			return await this.apiRequest(safeConnectUrl, "POST", "issue-attestation", serverPayload) as ProofResponseInterface;
		} catch (e) {
			throw new Error("Failed to get address attestation: " + e.message);
		}
	}

	private static async apiRequest(url: string, method: string, path: string, data?: any){

		let res = await fetch(url + "api/" + path, {
			method: method,
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (res.status > 299 || res.status < 200) {
			let msg;

			try {
				msg = (await res.json()).error;
			} catch (e){
				msg = "HTTP Request error: " + res.statusText;
			}

			throw new Error(msg);
		}

		return await res.json();
	}

	public static async createAndSignLinkAttestation(addressAttest: string, linkedEthAddress: string, holdingPrivKey: CryptoKey){

		const linkAttest = new EthereumKeyLinkingAttestation();

		linkAttest.create(addressAttest, linkedEthAddress, 3600);

		await linkAttest.sign(holdingPrivKey);

		return linkAttest.getBase64();
	}
}