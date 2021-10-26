import { AttestedObject } from "./AttestedObject";
import { Eip712DomainInterface } from "./SignatureUtility";
export declare class Eip712Validator {
    private XMLConfig;
    protected domain: string;
    constructor();
    static stringIsAValidUrl(domain: string): boolean;
    setDomainAndTimout(domain: string): void;
    setDomain(domain: string): void;
    getDomain(): string;
    validateRequest(jsonInput: string): boolean;
    validateDomain(domainToCheck: Eip712DomainInterface): boolean;
    retrieveAttestedObject(auth: any): AttestedObject;
    verifySignature(signedJsonInput: string, pkAddress: string): boolean;
}
