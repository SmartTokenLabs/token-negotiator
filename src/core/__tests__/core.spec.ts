// @ts-nocheck

import { SignedDevconTicket } from './../../Attestation/SignedDevonTicket';

import {
  filterTokens,
  readTokens,
  decodeTokens,
  getTokens,
  storeMagicURL,
  readMagicUrl
} from './../index';

// const mockToken = `?ticket="MIGWMA0MATYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAOOZKRpcE6tLBuPbfE_SmwPk2wNjbj5vpa6kkD7eqQXvBOCa0WNo8dEHKvipeUGZZEWWjJKxooB44dEYdQO70Vgc"&secret=45845870684&id="mah@mah.com"`

// window = {
//   removeEventListener: jest.fn(),
//   addEventListener: jest.fn(),
//   location: {
//     // @ts-ignore
//     search: () => { return mockToken }
//   },
//   // @ts-ignore
//   parent: {
//     postMessage: jest.fn()
//   }
// }

// const fakeLocalStorage = (function() {
//   let store = {};
//   return {
//     getItem: function(key:any) {
//       return store[key] || null;
//     },
//     setItem: function(key:any, value:any) {
//       store[key] = value.toString();
//     },
//     removeItem: function(key:any) {
//       delete store[key];
//     },
//     clear: function() {
//       store = {};
//     }
//   };
// })();

// global.localStorage = fakeLocalStorage;

describe('core Spec', () => {
  test('expect to read tokens but none are there', () => {
    expect(readTokens('testing')).toEqual({"noTokens": true, "success": true, "tokens": []});
  });
  // TODO NOT CORRECT OUTPUT
  // test('expect to read tokens (mock tokens created)', () => {
  //   const tokens = [ 
  //     { class: 'abc', type: 'gold' },
  //     { class: 'def', type: 'silver' },
  //     { class: 'ghi', type: 'bronze' },
  //   ]
  //   localStorage.setItem('testing', tokens);
  //   console.log(localStorage.getItem('testing'));
  //   expect(readTokens('testing')).toEqual({"noTokens": true, "success": true, "tokens": []});
  // });
  test('expect to decode missing params', () => {
    const rawTokens = '[]';
    const tokenParser = {};
    const unsignedTokenDataName = '';
    expect(decodeTokens(
      rawTokens,
      tokenParser,
      unsignedTokenDataName
    )).toEqual([]);
  });
  test('expect to decode no tokens', () => {
    const rawTokens = '[]';
    const tokenParser = SignedDevconTicket;
    const unsignedTokenDataName = 'ticket';
    expect(decodeTokens(
      rawTokens,
      tokenParser,
      unsignedTokenDataName
    )).toEqual([]);
  });
  test('expect to decode tokens', () => {
    const rawTokens = '[{"token":"MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=","secret":"10593082611958123069159986522878346963005475009650354554005852930286854271222","id":"nicktaras@hotmail.co.uk","magic_link":"https://devcontickets.herokuapp.com/outlet/?ticket=MIGSMAkMATkCAQECAQwEQQQbX0WI0BzxKHYHBSbyFIt7L44Rxcxqv8rXGpFuuO-bBBZ6YTzmvDzQWbmq2OqsTclAxy3cN2wzmPywz2A_nn0lA0IAi1qN7894PWzmk2wyQUo4MtlKkO5NZGNfkt7A6BbrfZY_E58Zy6kqYsciBsJY7P-UO2vnjCG88Dzx6bL-pdkmshs=&secret=10593082611958123069159986522878346963005475009650354554005852930286854271222&id=nicktaras@hotmail.co.uk"}]';
    const tokenParser = SignedDevconTicket;
    const unsignedTokenDataName = 'ticket';
    expect(decodeTokens(
      rawTokens,
      tokenParser,
      unsignedTokenDataName
    )).toEqual([{"devconId": "9", "ticketClass": 12, "ticketId": 1}]);
  });
//   test('expect store tokens inside cookies', () => {
//     const tokens = [ 
//       { class: 'abc', type: 'gold' },
//       { class: 'def', type: 'silver' },
//       { class: 'ghi', type: 'bronze' },
//     ]
//     storeMagicURL(tokens, 'testing');
//     expect(global.localStorage.getItem('testing')).toBe(JSON.stringify([
//       { class: 'abc', type: 'gold' },
//       { class: 'def', type: 'silver' },
//       { class: 'ghi', type: 'bronze' },
//     ]));
//   });
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

  // Acts as a fall back when filter is not correctly provided
  test('expect filter to return the input decoded tokens', () => {
    const tokens = [ 
      { class: 'abc', type: 'gold' },
      { class: 'def', type: 'silver' },
      { class: 'ghi', type: 'bronze' },
    ]
    const filter = "";
    expect(filterTokens(tokens, filter)).toEqual(tokens);
  });
  
  // Jest Test onerror
  // https://stackoverflow.com/questions/28584773/xmlhttprequest-testing-in-jest

  test('expect to open outlet iframe', () => {
    getTokens({
      filter: {},
      tokensOrigin: 'http://localhost:3002',
      localStorageItemName: 'dcTokens',
      tokenParser: SignedDevconTicket,
      unsignedTokenDataName: 'ticket'
    });
  });

  // TODO: Check with Oleh - tokenUrlName
  test('expect to read new magic link', () => {
    window.history.pushState({}, 'Test Title', '/?ticket=MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=&secret=285996413010999512790264856198259265088323878963947294417758116344175800611&id=nicktaras83@gmail.com');
    readMagicUrl(
      'ticket',
      'secret',
      'id',
      'dcTokens'
    );
  });

  test('expect to re-read magic link which is not pushed to state', () => {
    window.history.pushState({}, 'Test Title', '/?ticket=MIGSMAkMATkCAQUCAQwEQQQsUB1tp0mEn0Zoc8Lu-c0ZJOHis3ynlUAuplV8jpJhMgGMuP4i2msZihJq0VeBBOhGLU-vhfkn_0DYsJ9J8djgA0IAScs-3TwdMQ6XSIu1z1nDRCWEzAMBWaVEHONiRlW0j5kTEXBKvgNHS5DsjGm2S84BKqHl3qucBHUOGjpt-6hEuxw=&secret=285996413010999512790264856198259265088323878963947294417758116344175800611&id=nicktaras83@gmail.com');
    readMagicUrl(
      'ticket',
      'secret',
      'id',
      'dcTokens'
    );
    // try to add again. This time it will exist and not be added to array.
    readMagicUrl(
      'ticket',
      'secret',
      'id',
      'dcTokens'
    );
  });
  
});

