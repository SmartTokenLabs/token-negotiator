import {hexStringToUint8, uint8tohex} from "@tokenscript/attestation/dist/libs/utils";

let subtle: SubtleCrypto = crypto.subtle;

export interface StoredKey {
	id: string;
	privateKey: CryptoKey;
	publicKey: CryptoKey;
	spki?: string;
}

export class KeyStore {

	private static DB_NAME = "SCKeyStore";
	private static TABLE_NAME = "Keys";

	async getOrCreateKey(algorithm: string, id?: string): Promise<{attestHoldingKey: CryptoKeyPair, holdingPubKey: Uint8Array}>{

		let attestHoldingKey, holdingPubKey;

		let fullId = algorithm + (id ? "-" + id : "");

		try {
			attestHoldingKey = await this.getKey(fullId);

			if (attestHoldingKey) {

				holdingPubKey = hexStringToUint8(attestHoldingKey.spki);

			} else {

				console.log("Generating new attestation holding key...");

				attestHoldingKey = await subtle.generateKey(
					{
						name: algorithm,
						modulusLength: 2048, // Unless this is 2048 for RSA-PSS, signing causes an error in firefox. Maybe the salt is too big for 1024?
						publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
						hash: {name: "SHA-256"}
					},
					false,
					["sign", "verify"]
				);

				holdingPubKey = new Uint8Array(await subtle.exportKey("spki", attestHoldingKey.publicKey));

				await this.saveKey(fullId, attestHoldingKey.privateKey, attestHoldingKey.publicKey, uint8tohex(holdingPubKey));
			}

			console.log("Holding public: " + uint8tohex(holdingPubKey));

			return {attestHoldingKey, holdingPubKey};
		} catch (e: any){
			console.log("Failed to create attestor keypair: " + e.message);
			throw e;
		}
	}

	async getKey(id: string): Promise<StoredKey>{

		return new Promise((resolve, reject) => {

			this.getDb().then((db) => {

				let transaction = db.transaction(KeyStore.TABLE_NAME, "readonly");

				let store = transaction.objectStore(KeyStore.TABLE_NAME);

				let data = store.get(id);

				data.onsuccess = () => {
					resolve(data.result as StoredKey);
					db.close();
				};

				data.onerror = (e) => {
					reject(e);
				};
			}).catch((e: any) => {
				console.log(e);
				reject(e.message);
			});
		});
	}

	async saveKey(id: string, privKey: CryptoKey, pubKey: CryptoKey, spki: string){

		try {
			let db = await this.getDb();

			let transaction = db.transaction(KeyStore.TABLE_NAME, "readwrite");

			let store = transaction.objectStore(KeyStore.TABLE_NAME);

			let obj = <StoredKey>{
				id: id,
				privateKey: privKey,
				publicKey: pubKey,
				spki: spki
			}

			let req = store.put(obj);

			req.onsuccess = () => {
				db.close();
			}

		} catch (e: any){
			console.log("Failed to store key" + e.message);
		}
	}

	private async getDb(): Promise<IDBDatabase> {

		return new Promise(function(resolve, reject) {

			let dbReq = indexedDB.open(KeyStore.DB_NAME, 1);

			dbReq.onupgradeneeded = function (event) {
				let db = (event.target as any).result;

				if (!db.objectStoreNames.contains(KeyStore.TABLE_NAME))
					db.createObjectStore(KeyStore.TABLE_NAME, {keyPath: "id"});
			}
			dbReq.onsuccess = function (event) {
				let db = (<IDBOpenDBRequest>event.target).result;
				resolve(db);
			}
			dbReq.onerror = function (event) {
				reject('Error opening database ' + (event.target as any).errorCode);
			}

		});
	}
}