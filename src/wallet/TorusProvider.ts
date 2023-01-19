import Torus from '@toruslabs/torus-embed/dist/torus.umd.min'

export const getTorusProviderInstance = async () => {
	return new Torus()
}
