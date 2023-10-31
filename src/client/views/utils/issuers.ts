export const hasIssuerForBlockchain = (config, blockchain: 'evm' | 'solana' | 'flow' | 'ultra', useOauth = false) => {
  const _blockchain = blockchain.toLocaleLowerCase()
  return (
    config.issuers.filter((issuer: any) => {
      const issuerBlockChain = issuer.blockchain?.toLocaleLowerCase()
      const blockChainUsed = issuerBlockChain === blockchain
      const solanaEnabled = blockChainUsed && _blockchain === 'solana' && typeof window.solana !== 'undefined'
      const ultraEnabled = blockChainUsed && _blockchain === 'ultra' && typeof window.ultra !== 'undefined'
      const flowEnabled = blockChainUsed && _blockchain === 'flow'
      const evmEnabled = blockChainUsed && _blockchain === 'evm' && !issuer.oAuth2options && !useOauth
      const sociosEnabled = blockChainUsed && _blockchain === 'evm' && issuer.oAuth2options && useOauth
      const fallBackToEVM = _blockchain === 'evm' && !issuerBlockChain && !useOauth
      return solanaEnabled || ultraEnabled || evmEnabled || sociosEnabled || flowEnabled || fallBackToEVM
    }).length > 0
  )
}