import {Messaging as CoreMessaging, RequestInterfaceBase, ResponseInterfaceBase} from "../core/messaging";
import {Ui} from "./ui";

export enum OutletAction {
	MAGIC_URL = "magic-url",
	GET_ISSUER_TOKENS = "get-issuer-tokens",
	GET_PROOF = "get-proof"
}

export enum OutletResponseAction {
	ISSUER_TOKENS = "issuer-tokens",
	PROOF = "proof"
}

export class Messaging {

	public core = new CoreMessaging();

	async sendMessage(request: RequestInterfaceBase, forceTab = false, ui?: Ui): Promise<ResponseInterfaceBase> {

		try {
			return await this.core.sendMessage(request, forceTab);
		} catch (e) {

			if (e === "POPUP_BLOCKED" && ui){
				return this.handleUserClose(request, ui, forceTab);
			}

			if (e === "USER_ABORT"){
				// eslint-disable-next-line no-ex-assign
				e = this.createNamedError(e,"The user aborted the process.");
			}

			throw e;
		}
	}

	private handleUserClose(request: RequestInterfaceBase, ui: Ui, forceTab){

		return new Promise<ResponseInterfaceBase>((resolve, reject) => {

			ui.showError("Mmmmm looks like your popup blocker is getting in the way.");

			ui.setErrorRetryCallback(() => {
				this.core.sendMessage(request, forceTab).then((res) => {
					resolve(res);
				}).catch((e) => {
					if (e === "POPUP_BLOCKED"){
						e = this.createNamedError(e,"Please add an exception to your popup blocker before continuing.");
					}
					reject(e);
				});
			});

		});
	}

	private createNamedError(err: string, message: string): Error {
		let error = new Error(message);
		error.name = err;
		return error;
	}
}