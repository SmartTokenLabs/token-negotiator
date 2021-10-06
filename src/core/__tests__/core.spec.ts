import {
  filterTokens,
  openOutletIframe,
  // readTokens,
  // decodeTokens,
  // getTokens,
  // storeMagicURL,
  // readMagicUrl
} from './../index';

// const mockToken = `?ticket="MIGWMA0MATYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAOOZKRpcE6tLBuPbfE_SmwPk2wNjbj5vpa6kkD7eqQXvBOCa0WNo8dEHKvipeUGZZEWWjJKxooB44dEYdQO70Vgc"&secret=45845870684&id="mah@mah.com"`

window = {
  removeEventListener: jest.fn(),
  addEventListener: jest.fn(),
  location: {
    // @ts-ignore
    search: () => { return mockToken }
  },
  // @ts-ignore
  parent: {
    postMessage: jest.fn()
  }
}
 
describe('core Spec', () => {
  test('expect to be able to filter gold type tokens', () => {

    const tokens = [ 
      { class: 'abc', type: 'gold' },
      { class: 'def', type: 'silver' },
      { class: 'ghi', type: 'bronze' },
    ]

    const filter = { type: 'gold' };

    expect(filterTokens(tokens, filter)).toEqual([{ class: 'abc', type: 'gold' }]);
  });

  test('expect filter not to be able to filter tokens of gold and silver', () => {

    const tokens = [ 
      { class: 'abc', type: 'gold' },
      { class: 'def', type: 'silver' },
      { class: 'ghi', type: 'bronze' },
    ]

    const filter = { type: ['silver', 'gold'] };

    expect(filterTokens(tokens, filter)).toEqual([]);
  });
});

