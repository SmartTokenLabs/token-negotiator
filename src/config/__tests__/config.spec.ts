import { config } from "./../index";

describe('config spec', () => {
  test('expect a new instance of config', () => {});
  test('expect a new instance of config', () => {
    const _config = config['devcon-ticket'];
    expect(_config.tokenName).toEqual('devcon-ticket');
  });
});

