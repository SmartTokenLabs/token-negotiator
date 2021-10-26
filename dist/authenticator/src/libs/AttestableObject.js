export class AttestableObject {
    constructor() {
    }
    getDerEncoding() {
        return this.encoded;
    }
    getCommitment() {
        return this.commitment;
    }
}
