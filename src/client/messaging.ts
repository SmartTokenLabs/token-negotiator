import { Messaging as CoreMessaging, RequestInterfaceBase, ResponseInterfaceBase } from '../core/messaging'
import { UiInterface } from './ui'
import { ClientError, ClientErrorMessage } from './index'

export enum OutletAction {
	MAGIC_URL = 'magic-url',
	GET_ISSUER_TOKENS = 'get-issuer-tokens',
	GET_PROOF = 'get-proof',
	GET_MUTLI_PROOF = 'get-multi-proof',
	GET_PROOF_CALLBACK = 'proof-callback',
	EMAIL_ATTEST_CALLBACK = 'email-callback',
}

export enum OutletResponseAction {
	ISSUER_TOKENS = 'issuer-tokens',
	PROOF = 'proof',
}

export class Messaging {
	public core = new CoreMessaging()

	async sendMessage(
		request: RequestInterfaceBase,
		forceTab = false,
		ui?: UiInterface,
		redirectUrl: false | string = false,
	): Promise<ResponseInterfaceBase | void> {
		try {
			return await this.core.sendMessage(request, forceTab, redirectUrl)
		} catch (e) {
			if (e === ClientError.POPUP_BLOCKED) {
				if (ui) {
					return this.handleUserClose(request, ui, forceTab)
				} else {
					// eslint-disable-next-line no-ex-assign
					e = this.createNamedError(e, ClientErrorMessage.POPUP_BLOCKED)
				}
			}

			if (e === ClientError.USER_ABORT) {
				// eslint-disable-next-line no-ex-assign
				e = this.createNamedError(e, ClientErrorMessage.USER_ABORT)
			}

			throw e
		}
	}

	private handleUserClose(request: RequestInterfaceBase, ui: UiInterface, forceTab) {
		return new Promise<ResponseInterfaceBase | void>((resolve, reject) => {
			ui.showError('Mmmmm looks like your popup blocker is getting in the way.')

			ui.setErrorRetryCallback(() => {
				this.core
					.sendMessage(request, forceTab)
					.then((res) => {
						resolve(res)
					})
					.catch((e) => {
						if (e === ClientError.POPUP_BLOCKED) {
							e = this.createNamedError(e, ClientErrorMessage.POPUP_BLOCKED)
						} else if (e === ClientError.USER_ABORT) {
							e = this.createNamedError(e, ClientErrorMessage.USER_ABORT)
						}
						reject(e)
					})
			})
		})
	}

	private createNamedError(err: string, message: string): Error {
		let error = new Error(message)
		error.name = err
		return error
	}
}
