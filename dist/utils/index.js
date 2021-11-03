import { Buffer } from "buffer";
export var compareObjects = function (o1, o2) {
    return (JSON.stringify(o1) === JSON.stringify(o2));
};
export var base64ToUint8array = function (base64str) {
    base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=');
    return Uint8Array.from(Buffer.from(base64str, 'base64'));
};
//# sourceMappingURL=index.js.map