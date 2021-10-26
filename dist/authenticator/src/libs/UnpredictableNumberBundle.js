export class UnpredictableNumberBundle {
    constructor(number, randomness, domain, expiration) {
        this._number = number;
        this._randomness = randomness;
        this._domain = domain;
        this._expiration = expiration;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    get randomness() {
        return this._randomness;
    }
    set randomness(value) {
        this._randomness = value;
    }
    get domain() {
        return this._domain;
    }
    set domain(value) {
        this._domain = value;
    }
    get expiration() {
        return this._expiration;
    }
    set expiration(value) {
        this._expiration = value;
    }
}
