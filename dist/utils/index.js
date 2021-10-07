import { Buffer } from "buffer";
export const compareObjects = (o1, o2) => {
    return (JSON.stringify(o1) === JSON.stringify(o2));
};
export const base64ToUint8array = (base64str) => {
    base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=');
    return Uint8Array.from(Buffer.from(base64str, 'base64'));
};
