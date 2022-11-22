import { ethers } from "ethers";
import { logger } from "../utils";
import {SafeConnectOptions} from "./SafeConnectProvider";
import {Client} from "../client";

interface WalletConnectionState {
	[index: string]: WalletConnection
}

interface WalletConnection {
	address: string,
	chainId: number|string,
	providerType: string,
	blockchain: string,
	provider?: ethers.providers.Web3Provider,
	ethers?: any
}

export class Web3WalletProvider {

	private static LOCAL_STORAGE_KEY = "tn-wallet-connections";

	connections: WalletConnectionState = {};

	safeConnectOptions?: SafeConnectOptions;
	client: Client;

	constructor(client: Client, safeConnectOptions?: SafeConnectOptions) {
		this.client = client;
		this.safeConnectOptions = safeConnectOptions;
	}

	saveConnections(){

		let savedConnections: WalletConnectionState = {};

		for (let address in this.connections){
			let con = this.connections[address];

			savedConnections[address] = {
				address: con.address,
				chainId: con.chainId,
				providerType: con.providerType,
				blockchain: con.blockchain,
				ethers: ethers
			};
			
		}

		localStorage.setItem(Web3WalletProvider.LOCAL_STORAGE_KEY, JSON.stringify(savedConnections));

	}

	emitSavedConnection(address: string) {
		if(
			Object.keys(this.connections).length &&
			address
		) {
			this.client.eventSender.emitConnectedWalletInstance(this.connections[address.toLocaleLowerCase()]);
			return this.connections[address.toLocaleLowerCase()];
		} else {
			return null;
		}
	}
	
	emitNetworkChange(chainId: string) {

		if(chainId) {

			this.client.eventSender.emitNetworkChange(chainId);

			return chainId;
			
		}

	}

	deleteConnections(){
		this.connections = {};
		localStorage.removeItem(Web3WalletProvider.LOCAL_STORAGE_KEY);
		localStorage.removeItem("walletconnect");
	}

	async loadConnections(){

		let data = localStorage.getItem(Web3WalletProvider.LOCAL_STORAGE_KEY);

		if (!data) return;

		let state = JSON.parse(data);

		if (!state) return;

		for (let address in state){

			let connection = state[address];

			try {
				await this.connectWith(connection.providerType, true);
			} catch(e){
				console.log("Wallet couldn't connect" + e.message);
				delete state[address];
				this.saveConnections();
				this.emitSavedConnection(address);
			}
		}
	}

	async connectWith ( walletType: string, checkConnectionOnly = false ) {

		if(!walletType) throw new Error('Please provide a Wallet type to connect with.');

		if(this[walletType as keyof Web3WalletProvider]) {

			// @ts-ignore
			const address = await this[walletType as keyof Web3WalletProvider](checkConnectionOnly);

			logger(2, 'address', address);

			this.saveConnections();

			this.emitSavedConnection(address);

			return address;
             
		} else {

			throw new Error('Wallet type not found');

		}

	}

	async signMessage(address: string, message: string) {

		let provider = this.getWalletProvider(address);

		let signer = provider.getSigner(address);

		return await signer.signMessage(message);

	}

	getWalletProvider(address: string) {

		address = address.toLowerCase();

		if (!this.connections[address]?.provider)
			throw new Error("Wallet provider not found for address");

		return this.connections[address].provider;
	}

	getConnectedWalletData() {
		return Object.values(this.connections);
	}

	registerNewWalletAddress ( address: string, chainId: number|string, providerType: string, provider: any, blockchain = 'evm' ) {

		this.connections[address.toLowerCase()] = { address, chainId, providerType, provider, blockchain, ethers };

		return address;
	}

	private async registerProvider(provider: ethers.providers.Web3Provider, providerName: string){

		const accounts = await provider.listAccounts();
		const chainId = (await provider.detectNetwork()).chainId;

		if (accounts.length === 0){
			throw new Error("No accounts found via wallet-connect.");
		}

		let curAccount = accounts[0];

		this.registerNewWalletAddress(curAccount, chainId, providerName, provider);

		// @ts-ignore
		provider.provider.on("accountsChanged", (accounts) => {

			if (curAccount === accounts[0])
				return;

			delete this.connections[curAccount.toLowerCase()];

			curAccount = accounts[0];

			this.registerNewWalletAddress(curAccount, chainId, providerName, provider);

			this.saveConnections();

			this.emitSavedConnection(curAccount);

			this.client.getTokenStore().clearCachedTokens();
			this.client.enrichTokenLookupDataOnChainTokens();
		});

		// @ts-ignore
		provider.provider.on("chainChanged", (_chainId: any) => {
			
			this.registerNewWalletAddress(accounts[0], _chainId, providerName, provider);

			this.saveConnections();

			this.emitNetworkChange(_chainId);
			
		});

		return accounts[0];
	}

	async MetaMask (checkConnectionOnly: boolean) {

		logger(2, 'connect MetaMask');
      
		if (typeof window.ethereum !== 'undefined') {

			await window.ethereum.enable(); // fall back may be needed for FF to open Extension Prompt.

			const provider = new ethers.providers.Web3Provider(window.ethereum);

			return this.registerProvider(provider, "MetaMask");

		} else {

			throw new Error("MetaMask is not available. Please check the extension is supported and active.");

		}
        
	}

	async WalletConnect (checkConnectionOnly: boolean) {

		logger(2, 'connect Wallet Connect');

		const walletConnectProvider = await import("./WalletConnectProvider");

		const walletConnect = await walletConnectProvider.getWalletConnectProviderInstance(checkConnectionOnly);

		return new Promise((resolve, reject) => {

			if (checkConnectionOnly){
				walletConnect.connector.on("display_uri", (err, payload) => {
					reject(new Error("Connection expired"));
				});
			}

			walletConnect.enable().then(() => {
				const provider = new ethers.providers.Web3Provider(walletConnect);

				resolve(this.registerProvider(provider, "WalletConnect"));
			}).catch((e) => reject(e));

		})

	}

	async Torus (checkConnectionOnly: boolean) {

		const TorusProvider = await import("./TorusProvider");

		const torus = await TorusProvider.getTorusProviderInstance();
        
		await torus.init();

		await torus.login();

		const provider = new ethers.providers.Web3Provider(torus.provider);

		return this.registerProvider(provider, "Torus");

	}

	async Phantom () {

		logger(2, 'connect Phantom');

		if (typeof window.solana !== 'undefined') {

			const connection = await window.solana.connect();

			const accountAddress: string = connection.publicKey.toBase58();

			// mainnet-beta,
			return this.registerNewWalletAddress(accountAddress, "mainnet-beta", 'phantom', window.solana, 'solana');

		} else {

			throw new Error("MetaMask is not available. Please check the extension is supported and active.");

		}

	}

	async SafeConnect(){

		logger(2, 'connect SafeConnect');

		const provider = await this.getSafeConnectProvider();

		const address = await provider.initSafeConnect();

		this.registerNewWalletAddress(address, 1, "SafeConnect", provider);

		return address;
	}

	safeConnectAvailable(){
		return this.safeConnectOptions !== undefined;
	}

	async getSafeConnectProvider(){

		const {SafeConnectProvider} = await import("./SafeConnectProvider");

		return new SafeConnectProvider(this.client.getUi(), this.safeConnectOptions);
	}
}

export default Web3WalletProvider;
