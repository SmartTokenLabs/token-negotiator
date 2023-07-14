import { logger } from '../utils'
import { OutletInterface, OutletIssuerInterface } from './interfaces'

export interface StoredWhitelist {
	[origin: string]: {
		issuers: string[]
	}
}

export interface StaticWhitelist {
	[origin: string]: string[]
}

export class Whitelist {
	private static STORAGE_KEY = 'tn-whitelist'

	private storedWhitelist: StoredWhitelist = {}
	private staticWhitelist: StaticWhitelist = {}

	constructor(private config: OutletInterface, private showWhitelistCallback: () => void) {
		// Setup static whitelist values
		this.loadStaticWhitelist()

		// Load stored user whitelist
		this.loadStoredWhitelist()
	}

	private loadStaticWhitelist() {
		if (!this.config.issuers) return
		for (const { collectionID, whitelist } of this.config.issuers) {
			if (whitelist)
				for (let origin of whitelist) {
					try {
						origin = new URL(origin).origin
						if (!this.staticWhitelist[origin]) {
							this.staticWhitelist[origin] = [collectionID]
							continue
						}
						this.staticWhitelist[origin].push(collectionID)
					} catch (e) {
						logger(2, 'Failed to validate whitelist origin: ' + e.message)
					}
				}
		}
	}

	private loadStoredWhitelist() {
		try {
			this.storedWhitelist = JSON.parse(localStorage.getItem(Whitelist.STORAGE_KEY)) ?? ({} as StoredWhitelist)
		} catch (e) {
			// no-op
		}
	}

	private saveWhitelist() {
		localStorage.setItem(Whitelist.STORAGE_KEY, JSON.stringify(this.storedWhitelist))
	}

	public getWhitelistedIssuers(origin: string) {
		const issuers = this.storedWhitelist[origin]?.issuers ?? []

		if (this.staticWhitelist[origin])
			for (const entry of this.staticWhitelist[origin]) {
				issuers.push(entry)
			}

		return issuers
	}

	/**
	 * check if all provided issuers are whitelisted
	 * @param origin
	 * @param collectionIds
	 */
	private isWhitelisted(origin: string, collectionIds: string[]) {
		for (const id of collectionIds) {
			if (
				(!this.staticWhitelist[origin] || this.staticWhitelist[origin].indexOf(id) === -1) &&
				(!this.storedWhitelist[origin]?.issuers || this.storedWhitelist[origin].issuers.indexOf(id) === -1)
			) {
				return false
			}
		}

		return true
	}

	public async whitelistCheck(issuers: OutletIssuerInterface[], force: boolean) {
		// Whitelist exceptions
		if ((!window.parent && !window.opener) || !document.referrer) return

		const origin = new URL(document.referrer).origin

		if (origin === window.location.origin) return

		const collectionIds = issuers.map((issuer) => issuer.collectionID)

		if (force || !this.isWhitelisted(origin, collectionIds)) await this.showWhitelistDialog(origin, issuers)

		return this.getWhitelistedIssuers(origin)
	}

	private showWhitelistDialog(origin: string, issuers: OutletIssuerInterface[]) {
		return new Promise<void>((resolve, reject) => {
			const permissionContent = `
				<p>${origin} is requesting access to the following attestations</p>
				<div>
					${issuers.map(
						(issuer) => `
						<label>
							<input class="tn-permission-cb" type="checkbox" data-issuer="${issuer.collectionID}" ${
							!this.storedWhitelist[origin] || this.isWhitelisted(origin, [issuer.collectionID]) ? 'checked="checked"' : ''
						} />
							${issuer.title}
						</label>
					`,
					)}
				</div>
			`

			// TODO: Dialog should display title & icon list for all configured issuers

			const acceptBtn = '<button style="cursor: pointer" id="tn-access-accept">Accept</button>'
			const denyBtn = '<button style="cursor: pointer" id="tn-access-deny">Deny</button>'

			const content = this.config.whitelistDialogRenderer
				? this.config.whitelistDialogRenderer(permissionContent, acceptBtn, denyBtn)
				: `
					<div style="font-family: sans-serif; text-align: center; position: absolute; width: 100vw; min-height: 100vh;top: 0;
					left: 0;
					background: #0C0A50;
					z-index: 99999;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: #fff;
					padding: 30px;
					font-size: 24px;
					line-height: 1.2;">
						<div>
							${permissionContent}
						</div>
						<div>
						${acceptBtn}
						${denyBtn}
						</div>
					</div>
				`

			document.body.insertAdjacentHTML('beforeend', content)

			document.getElementById('tn-access-accept').addEventListener('click', () => {
				const checks = document.getElementsByClassName('tn-permission-cb') as HTMLCollectionOf<HTMLInputElement>

				let updatedOriginIssuersList = []

				for (const check of checks) {
					const issuer = check.getAttribute('data-issuer')
					if (!this.storedWhitelist[origin]?.issuers) this.storedWhitelist[origin] = { issuers: [] }
					if (check.checked) updatedOriginIssuersList.push(issuer)
				}

				this.storedWhitelist[origin].issuers = updatedOriginIssuersList

				this.saveWhitelist()

				resolve()
			})

			document.getElementById('tn-access-deny').addEventListener('click', () => {
				if (this.storedWhitelist[origin]) delete this.storedWhitelist[origin]

				this.saveWhitelist()

				reject(new Error('USER_ABORT'))
			})

			this.showWhitelistCallback()
		})
	}
}
