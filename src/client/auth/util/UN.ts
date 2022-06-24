import {ethers} from "ethers";
import {UNInterface} from "../../challenge";

export class UN {

	public static async getNewUN(endPoint: string): Promise<UNInterface> {

		try {
			const response = await fetch(endPoint);

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

	public static async validateChallenge(endPoint: string, data: UNInterface) {

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
	}
}