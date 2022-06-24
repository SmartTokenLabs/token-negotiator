import {Messaging, ResponseInterfaceBase} from "../core/messaging";
import {UNInterface} from "../client/challenge";
import {uint8tohex} from "@tokenscript/attestation/dist/libs/utils";
import {KeyStore} from "../client/auth/util/KeyStore";

export enum SafeConnectAction {
	CONNECT = "connect",
	NEW_CHALLENGE = "new_challenge"
}

export class SafeConnectProvider {

	private messaging = new Messaging();
	private keyStore = new KeyStore();

	private challengeData: UNInterface|null = null;

	private static HOLDING_KEY_ALGORITHM = "RSASSA-PKCS1-v1_5";

	public async initSafeConnect(){

		let holdingKey = await this.keyStore.getOrCreateKey(SafeConnectProvider.HOLDING_KEY_ALGORITHM);

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.CONNECT,
			origin: document.location.host === "localhost:8080" ? "http://localhost:8081" : "https://safeconnect.tk/",
			timeout: 0,
			data: {
				type: "address",
				subject: uint8tohex(holdingKey.holdingPubKey)
			}
		}, true);

		console.log(res);
		// TODO: Check challenge here or during getSignedChallenge?

		this.challengeData = res.data;

		return res.data?.address;
	}

	public async getSignedChallenge(){

		if (this.challengeData){

			if (this.challengeData?.expiration > Date.now()){
				return this.challengeData;
			}

			this.challengeData = null;
		}

		await this.initSafeConnect();

		return this.challengeData;
	}

}