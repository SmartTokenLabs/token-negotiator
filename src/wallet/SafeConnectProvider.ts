import {Messaging, ResponseInterfaceBase} from "../core/messaging";
import {UNInterface} from "../client/challenge";

export enum SafeConnectAction {
	CONNECT = "connect",
	NEW_CHALLENGE = "new_challenge"
}

export class SafeConnectProvider {

	private messaging = new Messaging();

	private challengeData: UNInterface|null = null;

	public async initSafeConnect(){

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.CONNECT,
			origin: document.location.host === "localhost:8080" ? "http://localhost:8081" : "https://safeconnect.tk/",
			timeout: 0,
			data: {}
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