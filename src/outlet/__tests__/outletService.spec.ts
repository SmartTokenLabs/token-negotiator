import OutletService from './../outletService';
import { config } from './../../config';

window = {
  removeEventListener: jest.fn(),
  addEventListener: jest.fn(),
  location: {
    // @ts-ignore
    search: jest.fn()
  },
  // @ts-ignore
  parent: {
    postMessage: jest.fn()
  }
}

class LocalStorageMock {
  store: any;
  constructor() { this.store = {}; }
  clear() { this.store = {}; }
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = String(value); }
  removeItem(key: string) { delete this.store[key]; }
}

// @ts-ignore
global.localStorage = new LocalStorageMock;

describe('outlet Spec', () => {
  test('expect a new instance of outlet service', () => {
    const outletService = new OutletService(config['devcon-ticket']);
    expect(outletService ? true : false).toEqual(true);
  });
  test('expect mock triggered event can be made to service', () => {
    const outletService = new OutletService(config['devcon-ticket']);
    outletService.eventReciever({
      evt: 'getTokens',
      localStorageItemName: 'test'
    });
  });
});


// eventReciever = (data: any) => {
//   switch (data.evt) {
//     case 'getTokens': 
//       const tokens = readTokens(data.localStorageItemName);
//       this.eventSender.emitTokens(tokens);
//     break;
//   }
// }