// eslint-disable-next-line no-undef
jest.spyOn(global.console, 'error').mockImplementation((message) => {
	if (!message.toString().startsWith('ReferenceError: fetch is not defined')) {
		throw new Error(`Unexpected console.error: ${message}`);
	}
});