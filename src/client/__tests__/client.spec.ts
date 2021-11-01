// @ts-nocheck
import { Client } from "./../index";

describe('client spec', () => {
  test('expect a new instance of client', () => {
    const x = new Client({}, 'devcon-ticket', {});
    expect(x.config.localStorageEthKeyItemName).toEqual("dcEthKeys");
    expect(x.config.tokenName).toEqual("devcon-ticket");
    expect(x.config.tokenOverlayOrigin).toEqual("https://tokenscript.github.io/token-negotiator-examples/github-pages-use-only/token-overlay-website/build/index.html");
  });
});

// negotiate
// negotiateViaOverlay
// connectMetamaskAndGetAddress
// signMessageWithBrowserWallet
// authenticate
// validateUseEthKey
// ethKeyIsValid
// getChallengeSigned
// signNewChallenge