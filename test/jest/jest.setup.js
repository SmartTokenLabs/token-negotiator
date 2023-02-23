// eslint-disable-next-line no-undef
jest.spyOn(global.console, 'error').mockImplementation((message) => {
	if (!message.toString().startsWith('ReferenceError: fetch is not defined')) {
		throw new Error(`Unexpected console.error: ${message}`);
	}
});

import crypto from "crypto";

Object.defineProperty(global.self, "crypto", { // eslint-disable-line
	value: {
		subtle: crypto.webcrypto.subtle,
	},
});

const localStorageMock = (function() {
	let store = {}

	return {
		getItem: function(key) {
			return store[key] || null
		},
		setItem: function(key, value) {
			store[key] = value.toString()
		},
		removeItem: function(key) {
			delete store[key]
		},
		clear: function() {
			store = {}
		}
	}
})()

Object.defineProperty(window, 'localStorage', { // eslint-disable-line
	value: localStorageMock
})