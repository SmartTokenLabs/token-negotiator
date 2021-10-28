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
  test('expect a new instance of outlet service without an instance of the Authenticator', () => {
    const outletService = new OutletService(config['devcon-ticket'], null);
    expect(outletService ? true : false).toEqual(true);
  });
  test('expect mock triggered event can be made to service without an instance of the Authenticator', () => {
    const outletService = new OutletService(config['devcon-ticket'], null);
    outletService.eventReciever({
      evt: 'getTokens',
      localStorageItemName: 'test'
    });
  });
});
