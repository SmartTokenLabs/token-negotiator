import { Magic } from 'magic-sdk'

export const getMagicProviderInstance = () => {
	return new Magic('pk_live_1DC8C5ABF9204C31', {
		network: 'goerli', // TODO: Expose configuration
	})
}
