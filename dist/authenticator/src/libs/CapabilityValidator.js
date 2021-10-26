import { CapabilityIssuer } from "./CapabilityIssuer";
const jwt = require('jsonwebtoken');
export class CapabilityValidator {
    constructor(verifyingKey, verifierDomain) {
        this.verifyingKey = verifyingKey;
        this.verifierDomain = verifierDomain;
        this.jwtData = {};
        this.jwtData['audience'] = verifierDomain;
        this.jwtData['issuer'] = verifierDomain;
    }
    validateRequest(jsonInput, domain, tasksThatMustBePresent) {
        try {
            jwt.verify(jsonInput, this.verifyingKey, Object.assign(this.jwtData, {
                subject: 'domain',
                issuer: 'urn:issuer'
            }), (err, decoded) => {
                return this.verifyTasks(decoded, tasksThatMustBePresent);
            });
            return false;
        }
        catch (e) {
            return false;
        }
    }
    verifyTasks(jwt, tasksThatMustBePresent) {
        let tasksString = jwt[CapabilityIssuer.TasksClaimName];
        let tasksInJwt = tasksString.split(",");
        return tasksThatMustBePresent.filter(task => !tasksInJwt.includes(task)).length == 0;
    }
}
