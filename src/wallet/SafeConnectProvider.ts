import {Messaging, ResponseInterfaceBase} from "../core/messaging";

export enum SafeConnectAction {
	CONNECT = "connect",
	NEW_CHALLENGE = "new_challenge"
}

export class SafeConnectProvider {

	private messaging = new Messaging();
	private challengeData?: {};

	// Connect and return address
	public async initSafeConnect(){

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.CONNECT,
			origin: "http://localhost:8081",
			timeout: 0,
			data: {
				// TODO: include UN here?
			}
		}, true);

		console.log(res);

		this.challengeData = res.data;

		return res.data?.address;
	}

	public async getSignedChallenge(){

		if (this.challengeData)
			return this.challengeData;

		return await this.initSafeConnect();
	}

}