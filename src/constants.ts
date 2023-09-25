export const HOLDING_KEY_ALGORITHM = 'RSASSA-PKCS1-v1_5'
export const DEFAULT_UN_ENDPOINT = 'https://api.smarttokenlabs.com/un'
export const COMMON_UN_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoidG9rZW4tbmVnb3RpYXRvciIsImlhdCI6MTY4OTc1NzQ4Nn0.ELE1OVvVFY1yrWlbnxtQur6dgeVxmKlPb9LZ_8cMOs8'
export const PROOF_STORAGE_KEY = 'tn-proof'
export const BASE_TOKEN_DISCOVERY_URL = 'https://api.token-discovery.tokenscript.org'
export const SUPPORTED_EVM_BLOCKCHAINS = ['evm', 'polygon', 'optimism', 'bsc', 'avalanche', 'fantom', 'goerli', 'mumbai', 'arbitrum']
export const DEFAULT_RPC_MAP = {
  1: 'https://ethereum.publicnode.com', // mainnet
  5: 'https://eth-goerli.g.alchemy.com/v2/yVhq9zPJorAWsw-F87fEabSUl7cCU6z4', // Goerli
  11155111: 'https://sepolia.infura.io/v3/9f79b2f9274344af90b8d4e244b580ef', // Sepolia
  137: 'https://polygon-rpc.com/', // Polygon
  80001: 'https://polygon-mumbai.g.alchemy.com/v2/rVI6pOV4irVsrw20cJxc1fxK_1cSeiY0', // mumbai
  56: 'https://bsc-dataseed.binance.org/', // BSC,
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545', // BSC testnet
  43114: 'https://api.avax.network/ext/bc/C/rpc', // Avalanche
  43113: 'https://api.avax-test.network/ext/bc/C/rpc', // Fuji testnet
  250: 'https://rpc.fantom.network/', // Fantom,
  25: 'https://evm-cronos.crypto.org', // Cronos,
  338: 'https://evm-t3.cronos.org', // Cronos testnet
  42161: 'https://arb1.arbitrum.io/rpc', // Arbitrum
  421613: 'https://arb-goerli.g.alchemy.com/v2/nFrflomLgsQQL5NWjGileAVqIGGxZWce', // Arbitrum goerli,
  10: 'https://mainnet.optimism.io', // Optimism
}
