export class Timestamp {
    constructor(timeSinceEpochInMs = null) {
        this.ALLOWED_ROUNDING = 1000;
        this.validity = 0;
        if (!timeSinceEpochInMs)
            this.time = Date.now();
        if (typeof timeSinceEpochInMs === 'number') {
            this.time = timeSinceEpochInMs;
        }
        if (typeof timeSinceEpochInMs === 'string') {
            this.time = Timestamp.stringTimestampToLong(timeSinceEpochInMs);
        }
        this.time = this.time - this.time % 1000;
    }
    fromString(timeAsString) {
        this.time = Timestamp.stringTimestampToLong(timeAsString);
    }
    getValidity() {
        return this.validity;
    }
    setValidity(validity) {
        this.validity = validity;
    }
    getTime() {
        return this.time;
    }
    getTimeAsString() {
        let preTime = new Date(this.time).toString();
        return preTime.substr(0, preTime.indexOf('(') - 1);
    }
    validateTimestamp() {
        let currentTime = this.getCurrentTime();
        if (this.time > currentTime + this.ALLOWED_ROUNDING) {
            return false;
        }
        if (this.time < currentTime - this.ALLOWED_ROUNDING - this.validity) {
            return false;
        }
        return true;
    }
    validateAgainstExpiration(expirationTimeInMs) {
        let currentTime = this.getCurrentTime();
        if (this.time > (currentTime + this.ALLOWED_ROUNDING)) {
            return false;
        }
        if (expirationTimeInMs < (currentTime - this.ALLOWED_ROUNDING)) {
            return false;
        }
        if ((expirationTimeInMs - this.time) > (this.validity + 3 * this.ALLOWED_ROUNDING)) {
            console.log(expirationTimeInMs + "\n" + this.time + "\n" + this.validity + "\n" + this.ALLOWED_ROUNDING + "\n" + (expirationTimeInMs - this.time) + "\n" + (this.validity + this.ALLOWED_ROUNDING) + "\n");
            return false;
        }
        return true;
    }
    static stringTimestampToLong(timestamp) {
        return Date.parse(timestamp);
    }
    getCurrentTime() {
        return Date.now();
    }
}
Timestamp.TIMESTAMP_FORMAT = "EEE MMM d yyyy HH:mm:ss 'GMT'Z";
Timestamp.ALLOWED_ROUNDING = 1000;
Timestamp.UNLIMITED = 253402297199000;
Timestamp.DEFAULT_TOKEN_TIME_LIMIT = 1000 * 60 * 60 * 24 * 365;
Timestamp.DEFAULT_TIME_LIMIT_MS = 1000 * 60 * 20;
