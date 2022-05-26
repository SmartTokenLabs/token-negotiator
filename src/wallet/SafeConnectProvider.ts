import {Messaging, ResponseInterfaceBase} from "../core/messaging";

export enum SafeConnectAction {
	CONNECT = "connect",
	NEW_CHALLENGE = "new_challenge"
}

export class SafeConnectProvider {

	private messaging = new Messaging();
	private connectedAddress = null;
	private challenge = null;

	// Connect and return address
	public async initSafeConnect(){

		let res: ResponseInterfaceBase = await this.messaging.sendMessage({
			action: SafeConnectAction.CONNECT,
			origin: "http://localhost:8081",
			data: {
				// TODO: include UN here?
			}
		});

		console.log(res);

		this.connectedAddress = res.data?.address;
		this.challenge = res.data?.challenge;

		return res.data?.address;
	}

}