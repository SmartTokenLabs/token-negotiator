import * as fcl from '@onflow/fcl/dist/fcl.umd.min'

fcl.config({
	'accessNode.api': 'https://rest-mainnet.onflow.org',
	'discovery.wallet': 'https://fcl-discovery.onflow.org/authn',
})

export const getFlowProvider = () => {
	return fcl
}
