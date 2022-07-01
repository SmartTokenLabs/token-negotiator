import {Messaging, ResponseInterfaceBase} from "../core/messaging";
import {uint8tohex} from "@tokenscript/attestation/dist/libs/utils";
import {KeyStore} from "../client/auth/util/KeyStore";
import {AuthenticationResult} from "../client/auth/abstractAuthentication";
import {AttestedAddress} from "../client/auth/attestedAddress";
// import {SafeConnectChallenge} from "../client/auth/safeConnectChallenge";

export enum SafeConnectAction {
	CONNECT = "connect",
	NEW_CHALLENGE = "new_challenge"
}

export class SafeConnectProvider {

	private messaging = new Messaging();
	private keyStore = new KeyStore();

	public static HOLDING_KEY_ALGORITHM = "RSASSA-PKCS1-v1_5";

	public async initSafeConnect(){

		let holdingKey = await this.keyStore.getOrCreateKey(SafeConnectProvider.HOLDING_KEY_ALGORITHM);

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.CONNECT,
			origin: document.location.host === "localhost:8080" ? "http://localhost:8081" : "https://safeconnect.tk/",
			timeout: 0,
			data: {
				type: "address_attest",
				subject: uint8tohex(holdingKey.holdingPubKey)
				// type: "simple_challenge",
			}
		}, true);

		console.log(res);

		let attestedAddress = new AttestedAddress();

		let proofData: AuthenticationResult = {
			type: attestedAddress.TYPE,
			data: {
				attestation: res.data.attestation
			},
			target: {
				address: res.data.address
			}
		};

		attestedAddress.saveProof(res.data.address, proofData);

		/* let simpleChallenge = new SafeConnectChallenge();

		let proofData: AuthenticationResult = {
			type: simpleChallenge.TYPE,
			data: res.data,
			target: {
				address: res.data.address
			}
		};

		simpleChallenge.saveProof(res.data.address, proofData);*/

		return res.data?.address;
	}

	public async getLinkSigningKey(){
		let keys = await this.keyStore.getOrCreateKey(SafeConnectProvider.HOLDING_KEY_ALGORITHM);
		return keys.attestHoldingKey.privateKey;
	}

}