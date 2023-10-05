// @ts-nocheck
import { EventHookHandler } from '../eventHookHandler'

const mockCallback = jest.fn();

describe('client spec', () => {
	test('eventHookHandler can subscribe and trigger events', async () => {
		const eventHookHandler = new EventHookHandler()
		eventHookHandler.subscribe('selected-tokens', mockCallback);
		eventHookHandler.trigger('selected-tokens', { data: "It's not a bug; it's an undocumented feature" });
		expect(mockCallback).toHaveBeenCalled();
	})
	test('eventHookHandler can unsubscribe', async () => {
		const eventHookHandler = new EventHookHandler()
		const unsubscribe = eventHookHandler.subscribe('selected-tokens', mockCallback);
		unsubscribe();
		eventHookHandler.trigger('selected-tokens', { data: "Make it work, make it right, make it fast." });
		expect(mockCallback).toHaveLength(0);
	})
	test('eventHookHandler can unsubscribe all subscriptions of event type', async () => {
		const eventHookHandler = new EventHookHandler()
		eventHookHandler.subscribe('selected-tokens', mockCallback);
		eventHookHandler.unsubscribe('selected-tokens');
		eventHookHandler.trigger('selected-tokens', { data: "Make it work, make it right, make it fast." });
		expect(mockCallback).toHaveLength(0);
	})
})