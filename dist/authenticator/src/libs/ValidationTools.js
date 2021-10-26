export class ValidationTools {
    static validateTimestamp(timestamp, currentTime, timestampSlack) {
        if (timestamp > currentTime + timestampSlack) {
            return false;
        }
        if (timestamp < currentTime - timestampSlack) {
            return false;
        }
        return true;
    }
    static isAddress(address) {
        if (address.toLowerCase().match(/^0x[a-f0-9]{40}$/i) === null) {
            console.log('Wrong Ethereum Address');
            return false;
        }
        return true;
    }
    static isNullOrAddress(address) {
        if (address == null) {
            return true;
        }
        return this.isAddress(address);
    }
}
ValidationTools.ADDRESS_LENGTH_IN_BYTES = 42;
