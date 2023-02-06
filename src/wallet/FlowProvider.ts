import * as fcl from '@onflow/fcl'

// const unsubscribe = fcl.currentUser.subscribe(currentUser => {
// 	console.log("The Current User", currentUser)
// });

fcl.config({
	'accessNode.api': 'https://rest-mainnet.onflow.org',
	'discovery.wallet': 'https://fcl-discovery.onflow.org/authn',
})

export const getFlowProvider = () => {
	return fcl
}
