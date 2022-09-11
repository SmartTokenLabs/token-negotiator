var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Buffer } from "buffer";
export function logger(level) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!window.DISPLAY_DEBUG_LEVEL || level > parseInt(window.DISPLAY_DEBUG_LEVEL))
        return;
    console.log.apply(console, __spreadArray([], __read(args), false));
}
export var requiredParams = function (item, msg) {
    if (!item)
        throw new Error(msg);
};
export function uint8toBuffer(uint8) {
    if (typeof Buffer !== "undefined") {
        return Buffer.from(uint8);
    }
    else {
        return uint8;
    }
}
export var compareObjects = function (o1, o2) {
    var e_1, _a;
    var keys1 = Object.keys(o1);
    var keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    try {
        for (var keys1_1 = __values(keys1), keys1_1_1 = keys1_1.next(); !keys1_1_1.done; keys1_1_1 = keys1_1.next()) {
            var key = keys1_1_1.value;
            if (typeof o2[key] === "object") {
                if (JSON.stringify(o1[key]) !== JSON.stringify(o2[key])) {
                    return false;
                }
            }
            else if (o1[key] !== o2[key]) {
                return false;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (keys1_1_1 && !keys1_1_1.done && (_a = keys1_1.return)) _a.call(keys1_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
};
export var base64ToUint8array = function (base64str) {
    base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=');
    return Uint8Array.from(Buffer.from(base64str, 'base64'));
};
export var attachPostMessageListener = function (listener) {
    if (window.addEventListener) {
        window.addEventListener("message", listener, false);
    }
    else {
        window.attachEvent("onmessage", listener);
    }
};
export var removePostMessageListener = function (listener) {
    if (window.removeEventListener) {
        window.removeEventListener("message", listener);
    }
    else {
        window.detachEvent("onmessage", listener);
    }
};
//# sourceMappingURL=index.js.map