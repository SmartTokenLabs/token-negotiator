import {SafeConnectProvider} from "../wallet/SafeConnectProvider";
import {ethers} from "ethers";
import web3WalletProvider from "../wallet/Web3WalletProvider";

export interface UNInterface {
	expiration: number;
	domain: string;
	randomness: string;
	UN: string;
	messageToSign: string;
	address?: string;
	signature?: string;
}

export class Challenge {

	public static STORAGE_KEY = "tn-challenges";
	public static DEFAULT_ENDPOINT = "https://crypto-verify.herokuapp.com/use-devcon-ticket";

	public async getSignedChallenge(address: string, web3WalletProvider: web3WalletProvider, unEndpoint: string = Challenge.DEFAULT_ENDPOINT){

		let walletConnection = web3WalletProvider.getConnectedWalletData()[0].provider;

		let signedChallenge: UNInterface|null = this.getChallenge(address);

		if (!signedChallenge){

			if (walletConnection instanceof SafeConnectProvider){

				signedChallenge = await walletConnection.getSignedChallenge();

				if (!signedChallenge)
					throw new Error("Safe connect challenge failed.");

			} else {

				const challenge = await this.getNewUN(unEndpoint);

				const signature = await walletConnection.signWith(
					challenge.messageToSign,
					web3WalletProvider.getConnectedWalletData()[0]
				);

				signedChallenge = challenge;
				signedChallenge.signature = signature;
			}

			// Check that recovered address matches the signature of the requested address
			let recoveredAddr = Challenge.recoverAddress(signedChallenge);

			if (recoveredAddr !== address.toLowerCase()){
				throw new Error("Address signature is invalid");
			}

			// Save the challenge
			signedChallenge.address = recoveredAddr
			this.saveChallenge(signedChallenge.address, signedChallenge);
		}

		return signedChallenge;
	}

	private saveChallenge(address: string, unChallenge: UNInterface){

		const challenges = this.getChallenges();

		challenges[address.toLowerCase()] = unChallenge;

		localStorage.setItem(
			Challenge.STORAGE_KEY,
			JSON.stringify(challenges)
		);
	}

	// Get challenge, check expiry and validity first, delete if invalid
	private getChallenge(address: string){

		const challenges = this.getChallenges();

		if (challenges[address]){

			if (challenges[address].expiration > Date.now() &&
				Challenge.recoverAddress(challenges[address]) === address.toLowerCase()) {

				return challenges[address];
			} else {

				delete challenges[address];
				localStorage.setItem(Challenge.STORAGE_KEY, JSON.stringify(challenges));
			}
		}

		return null;
	}

	private getChallenges(): {[address: string]: UNInterface}{
		const data = localStorage.getItem(Challenge.STORAGE_KEY);

		return data && data.length ? JSON.parse(data) : {};
	}

	private async getNewUN(endPoint: string): Promise<UNInterface> {

		try {
			const response = await fetch(Challenge.DEFAULT_ENDPOINT);

			return await response.json();

		} catch (e: any) {
			throw new Error("Failed to fetch UN challenge: " + e.message);
		}
	}

	public static recoverAddress(un: UNInterface){

		if (!un.signature)
			throw new Error("Null signature");

		const msgHash = ethers.utils.hashMessage(un.messageToSign);
		const msgHashBytes = ethers.utils.arrayify(msgHash);
		return ethers.utils.recoverAddress(msgHashBytes, un.signature).toLowerCase();
	}

	private async validateChallenge(endPoint: string, data: any) {
		try {
			const response = await fetch(endPoint, {
				method: "POST",
				cache: "no-cache",
				headers: { "Content-Type": "application/json" },
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify(data),
			});

			const json = await response.json();

			return json.address;
		} catch (e) {
			return {
				success: false,
				message: "validate ethkey request failed",
			};
		}
	}
}