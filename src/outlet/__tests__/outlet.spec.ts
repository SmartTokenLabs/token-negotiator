import { Outlet } from './../index';

window = {
  removeEventListener: jest.fn(),
  addEventListener: jest.fn(),
  location: {
    // @ts-ignore
    search: jest.fn()
  }
}

describe('outlet Spec', () => {
  test('expect a new instance of outlet', () => {
    const outlet = new Outlet({
      tokenUrlName: 'ticket',
      tokenSecretName: 'secret',
      tokenIdName: 'id',
      localStorageItemName: 'dcTokens'
    });
    expect(outlet ? true : false).toEqual(true);
  });

});
