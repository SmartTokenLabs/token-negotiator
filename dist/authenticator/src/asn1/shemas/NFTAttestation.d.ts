import { UriIdAttestation } from "./UriIdAttestation";
export declare class ERC721 {
    TokenId: Uint8Array;
    Address: Uint8Array;
}
export declare class Tokens {
    tokens: ERC721;
}
export declare class NFTAttestation {
    creator: UriIdAttestation;
    tokens?: Tokens;
    nftDigest?: Uint8Array;
}
