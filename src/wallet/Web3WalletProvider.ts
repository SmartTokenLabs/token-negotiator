import { ethers } from "ethers";
import { logger } from "../utils";
import {SafeConnectOptions} from "./SafeConnectProvider";
import {Client} from "../client";

interface WalletConnectionState {
	[index: string]: WalletConnection
}

interface WalletConnection {
	address: string,
	chainId: number,
	providerType: string,
	provider?: ethers.providers.Web3Provider
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
				providerType: con.providerType
			};
		}

		localStorage.setItem(Web3WalletProvider.LOCAL_STORAGE_KEY, JSON.stringify(savedConnections));
	}

	deleteConnections(){
		this.connections = {};
		localStorage.removeItem(Web3WalletProvider.LOCAL_STORAGE_KEY);
	}

	async loadConnections(){

		let data = localStorage.getItem(Web3WalletProvider.LOCAL_STORAGE_KEY);

		if (!data) return;

		let state = JSON.parse(data);

		if (!state) return;

		for (let address in state){

			let connection = state[address];

			try {
				await this.connectWith(connection.providerType);
			} catch(e){
				console.log("Wallet couldn't connect" + e.message);
				delete state[address];
				this.saveConnections();
			}
		}
	}

	async connectWith ( walletType: string ) {

		if(!walletType) throw new Error('Please provide a Wallet type to connect with.');

		if(this[walletType as keyof Web3WalletProvider]) {

			// @ts-ignore
			const address = await this[walletType as keyof Web3WalletProvider]();

			logger(2, 'address', address);

			this.saveConnections();

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

	registerNewWalletAddress ( address: string, chainId: number, providerType: string, provider: any ) {

		this.connections[address.toLowerCase()] = { address, chainId, providerType, provider };

		return address;
	}

	private async registerProvider(provider: ethers.providers.Web3Provider, providerName: string, blockChain='evm'){

		const accounts = await provider.listAccounts();
		const chainId = (await provider.detectNetwork()).chainId;

		if (accounts.length === 0){
			throw new Error("No accounts found via wallet-connect.");
		}

		for (let account of accounts){
			this.registerNewWalletAddress(account, chainId, providerName, provider);
		}

		// @ts-ignore
		provider.provider.on("accountsChanged", (accounts) => {

			console.log("Account changed!");

			for (let i in this.connections){
				if (this.connections[i].providerType === providerName)
					delete this.connections[i];
			}

			for (let account of accounts){
				this.registerNewWalletAddress(account, chainId, providerName, provider);
			}
			this.saveConnections();
		});

		return accounts[0];
	}

	async MetaMask () {

		logger(2, 'connect MetaMask');
      
		if (typeof window.ethereum !== 'undefined') {

			await window.ethereum.enable(); // fall back may be needed for FF to open Extension Prompt.

			const provider = new ethers.providers.Web3Provider(window.ethereum);

			return this.registerProvider(provider, "MetaMask");

		} else {

			throw new Error("MetaMask is not available. Please check the extension is supported and active.");

		}
        
	}

	async WalletConnect () {

		logger(2, 'connect Wallet Connect');

		const walletConnectProvider = await import("./WalletConnectProvider");

		const walletConnect = await walletConnectProvider.getWalletConnectProviderInstance();

		await walletConnect.enable();

		const provider = new ethers.providers.Web3Provider(walletConnect);

		return this.registerProvider(provider, "WalletConnect");

	}

	async Torus () {

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

			const accountAddress:string = connection.publicKey.toBase58();

			// mainnet-beta,
			return this.registerNewWalletAddress(accountAddress, "mainnet-beta", window.solana, 'solana');

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
