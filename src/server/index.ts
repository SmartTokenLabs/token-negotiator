export class Server {
	public socios: any
	public tokenConfig: any
	constructor(public _tokenConfig: any) {
		this.tokenConfig = _tokenConfig
		this.initSocios()
	}
	async initSocios() {
		if (this.tokenConfig.issuers.socios) {
			const { Socios } = await import('./socios')
			this.socios = new Socios(this.tokenConfig)
		}
	}
}
