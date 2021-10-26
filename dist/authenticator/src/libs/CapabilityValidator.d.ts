export declare class CapabilityValidator {
    private verifyingKey;
    private verifierDomain;
    private jwtData;
    constructor(verifyingKey: string, verifierDomain: string);
    validateRequest(jsonInput: string, domain: string, tasksThatMustBePresent: string[]): boolean;
    verifyTasks(jwt: any, tasksThatMustBePresent: string[]): boolean;
}
