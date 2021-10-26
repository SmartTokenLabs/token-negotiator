import { Proof } from "./ProofOfExponentASN";
import { MyAttestation, PublicKeyInfoValue } from "./AttestationFramework";
export declare class UseAttestation {
    attestation: MyAttestation;
    type: number;
    proof: Proof;
    sessionKey: PublicKeyInfoValue;
}
