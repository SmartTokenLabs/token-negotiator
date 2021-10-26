import { Proof } from "./ProofOfExponentASN";
import { PublicKeyInfoValue } from "./AttestationFramework";
export declare class Identifier {
    type: number;
    proof: Proof;
    sessionKey: PublicKeyInfoValue;
}
