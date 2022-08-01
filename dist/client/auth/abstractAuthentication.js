var AbstractAuthentication = (function () {
    function AbstractAuthentication(client) {
        this.client = client;
    }
    AbstractAuthentication.prototype.saveProof = function (key, proof) {
        var challenges = this.getProofs();
        challenges[this.getFullKey(key)] = proof;
        localStorage.setItem(AbstractAuthentication.STORAGE_KEY, JSON.stringify(challenges));
    };
    AbstractAuthentication.prototype.getSavedProof = function (key) {
        var challenges = this.getProofs();
        var fullKey = this.getFullKey(key);
        if (challenges[fullKey]) {
            return challenges[fullKey];
        }
        return null;
    };
    AbstractAuthentication.prototype.deleteProof = function (key) {
        var challenges = this.getProofs();
        var fullKey = this.getFullKey(key);
        if (challenges[fullKey])
            delete challenges[fullKey];
        localStorage.setItem(AbstractAuthentication.STORAGE_KEY, JSON.stringify(challenges));
    };
    AbstractAuthentication.prototype.getFullKey = function (key) {
        return this.TYPE + "-" + key.toLowerCase();
    };
    AbstractAuthentication.prototype.getProofs = function () {
        var data = localStorage.getItem(AbstractAuthentication.STORAGE_KEY);
        return data && data.length ? JSON.parse(data) : {};
    };
    AbstractAuthentication.STORAGE_KEY = "tn-proof";
    return AbstractAuthentication;
}());
export { AbstractAuthentication };
//# sourceMappingURL=abstractAuthentication.js.map