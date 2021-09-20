export const compareObjects = (o1, o2) => {
  for (var p in o1) {
    if (o1.hasOwnProperty(p)) {
      if (o1[p].toString() !== o2[p].toString()) {
        return false;
      }
    }
  }
  for (var p in o2) {
    if (o2.hasOwnProperty(p)) {
      if (o1[p].toString() !== o2[p].toString()) {
        return false;
      }
    }
  }
  return true;
};

export const base64ToUint8array = (base64str) => {
  base64str = base64str.split('-').join('+').split('_').join('/').split('.').join('=');
  if (typeof Buffer !== 'undefined') return Uint8Array.from(Buffer.from(base64str, 'base64'));
  else return Uint8Array.from(atob(base64str), c => c.charCodeAt(0));
}