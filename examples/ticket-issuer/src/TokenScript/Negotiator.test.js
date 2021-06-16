import { Negotiator } from './Negotiator';

test('Negotiator provides the correctly given filters', () => {
  localStorage.setItem('dcTokens', '[]');
  const negotiator = new Negotiator(["tickets", "expiry > today"]);
  expect(negotiator.filter).toEqual(['tickets', 'expiry > today']);
});
