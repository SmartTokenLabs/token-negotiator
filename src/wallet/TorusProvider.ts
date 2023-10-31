export const getTorusProviderInstance = async () => {
	return new (await import('@toruslabs/torus-embed/dist/torus.umd.min')).Torus()
}
