import {Messaging, ResponseInterfaceBase} from "../core/messaging";
import {uint8tohex} from "@tokenscript/attestation/dist/libs/utils";
import {KeyStore} from "../client/auth/util/KeyStore";
import {AuthenticationResult} from "../client/auth/abstractAuthentication";
import {AttestedAddress} from "../client/auth/attestedAddress";
import {UNInterface} from "../client/auth/util/UN";
// import {SafeConnectChallenge} from "../client/auth/safeConnectChallenge";

export enum SafeConnectAction {
	CONNECT = "connect",
	SIGN_UN = "sign_un",
	NEW_CHALLENGE = "new_challenge"
}

export class SafeConnectProvider {

	private messaging = new Messaging();
	private keyStore = new KeyStore();
	private readonly url: string;

	public static HOLDING_KEY_ALGORITHM = "RSASSA-PKCS1-v1_5";

	constructor(url: string) {
		this.url = url;
	}

	public async initSafeConnect(){

		let holdingKey = await this.keyStore.getOrCreateKey(SafeConnectProvider.HOLDING_KEY_ALGORITHM);

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.CONNECT,
			origin: this.url,
			timeout: 0,
			data: {
				type: "address_attest",
				subject: uint8tohex(holdingKey.holdingPubKey)
				// type: "simple_challenge",
			}
		}, true);

		let attest = res.data;

		let attestedAddress = new AttestedAddress();

		let proofData: AuthenticationResult = {
			type: attestedAddress.TYPE,
			data: {
				attestation: attest.data.attestation
			},
			target: {
				address: attest.data.address
			}
		};

		attestedAddress.saveProof(attest.data.address, proofData);

		/* let simpleChallenge = new SafeConnectChallenge();

		let proofData: AuthenticationResult = {
			type: simpleChallenge.TYPE,
			data: res.data,
			target: {
				address: res.data.address
			}
		};

		simpleChallenge.saveProof(res.data.address, proofData);*/

		return attest.data?.address;
	}

	public async signUNChallenge(un: UNInterface){

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.SIGN_UN,
			origin: document.location.host === "localhost:8080" ? "http://localhost:8081" : "https://safeconnect.tk/",
			timeout: 0,
			data: {
				un: encodeURIComponent(JSON.stringify(un))
			}
		}, true);

		console.log(res);

		return res.data.signature;
	}

	public async getLinkSigningKey(){
		let keys = await this.keyStore.getOrCreateKey(SafeConnectProvider.HOLDING_KEY_ALGORITHM);
		return keys.attestHoldingKey.privateKey;
	}

}