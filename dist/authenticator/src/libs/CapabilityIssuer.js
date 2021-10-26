import { getInt64Bytes, stringToArray, uint8arrayToBase64, uint8merge } from "./utils";
import { AttestationCrypto } from "./AttestationCrypto";
const jwt = require('jsonwebtoken');
export class CapabilityIssuer {
    constructor(privateKeyOrSecret, verifierDomain) {
        this.privateKeyOrSecret = privateKeyOrSecret;
        this.verifierDomain = verifierDomain;
    }
    makeToken(domain, tasks, expirationTimeInDays) {
        let flattenedTasks = this.flattenSet(tasks);
        let currentTime = Date.now();
        let expirationInMs = currentTime + expirationTimeInDays * 24 * 60 * 60 * 1000;
        return this.buildSignedToken(domain, flattenedTasks, expirationInMs, currentTime);
    }
    buildSignedToken(domain, flattenedTasks, expirationTimeInMs, creationTimeInMs) {
        let jwtData = {
            aud: this.verifierDomain,
            iss: this.verifierDomain,
            sub: domain,
            nbf: new Date(creationTimeInMs).valueOf(),
            exp: new Date(expirationTimeInMs).valueOf(),
            iat: new Date(creationTimeInMs).valueOf(),
            jti: this.getJWTID(domain, flattenedTasks, expirationTimeInMs, creationTimeInMs)
        };
        let jwtOptions = {};
        jwtData[CapabilityIssuer.TasksClaimName] = flattenedTasks;
        return jwt.sign(jwtData, this.privateKeyOrSecret, jwtOptions);
    }
    flattenSet(tasks) {
        if (!tasks.length || tasks.length == 0) {
            throw new Error("At least one task must be assigned");
        }
        let flattenedList = '';
        tasks.forEach(task => {
            let normalizedTask = task.toLowerCase().trim();
            if (normalizedTask.includes(",")) {
                throw new Error("A task contains a ',' which is not permitted");
            }
            flattenedList += normalizedTask + ',';
        });
        return flattenedList.slice(0, -1);
    }
    getJWTID(domain, flattenedTasks, expirationTime, currentTime) {
        let toHash = uint8merge([
            new Uint8Array(stringToArray(domain)),
            new Uint8Array(stringToArray(CapabilityIssuer.TasksClaimName)),
            new Uint8Array(stringToArray(flattenedTasks)),
            new Uint8Array(stringToArray(flattenedTasks)),
            getInt64Bytes(expirationTime),
            getInt64Bytes(currentTime)
        ]);
        let digest = AttestationCrypto.hashWithKeccak(toHash);
        return uint8arrayToBase64(digest);
    }
}
CapabilityIssuer.TasksClaimName = "org.devcon.ticket.capability";
