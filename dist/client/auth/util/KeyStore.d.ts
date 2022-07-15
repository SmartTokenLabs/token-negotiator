export interface StoredKey {
    id: string;
    privateKey: CryptoKey;
    publicKey: CryptoKey;
    spki?: string;
}
export declare class KeyStore {
    private static DB_NAME;
    private static TABLE_NAME;
    getOrCreateKey(algorithm: string, id?: string): Promise<{
        attestHoldingKey: CryptoKeyPair;
        holdingPubKey: Uint8Array;
    }>;
    getKey(id: string): Promise<StoredKey>;
    saveKey(id: string, privKey: CryptoKey, pubKey: CryptoKey, spki: string): Promise<void>;
    private getDb;
}
