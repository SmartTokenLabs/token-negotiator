// @ts-nocheck

import { Messaging } from '../messaging'

let assignMock = jest.fn()

delete window.location
window.location = { assign: assignMock }

describe('Redirect flow', () => {
	const { location } = window

	beforeAll(() => {
		delete window.location
		window.location = { hash: '' }
	})

	afterAll(() => {
		window.location = location
	})

	test('construct redirect URL', async () => {
		const messaging = new Messaging()
		await messaging.sendMessage({ origin: 'https://origin.url', action: 111, data: { token: '222' } }, false, 'https://test.test')
		let url = new URL(window.location.href)
		expect(new URLSearchParams(url.hash.substring(1)).get('tn-action')).toBe('111')
	})
})
