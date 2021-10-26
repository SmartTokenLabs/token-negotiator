export declare class CapabilityIssuer {
    private privateKeyOrSecret;
    private verifierDomain;
    private signingKeys;
    static TasksClaimName: string;
    constructor(privateKeyOrSecret: string, verifierDomain: string);
    makeToken(domain: string, tasks: string[], expirationTimeInDays: number): any;
    buildSignedToken(domain: string, flattenedTasks: string, expirationTimeInMs: number, creationTimeInMs: number): any;
    flattenSet(tasks: string[]): string;
    getJWTID(domain: string, flattenedTasks: string, expirationTime: number, currentTime: number): string;
}
