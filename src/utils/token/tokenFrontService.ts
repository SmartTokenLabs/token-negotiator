const GRAPHQL_API = "https://test-api.tokenfront.tokenscript.org/graphql";

export interface Nft{
	owner: string
	tokenAddress: string
	tokenId: string
	tokenType: string
	symbol: string
	name: string
	balance: string
	metadata: string
	totalSupply: string
	contractMetadata: string
}

export interface ContractMeta {
	address: string
	tokenType: string
	symbol: string
	name: string
	metadata: string
	totalSupply: string
}

export interface contractMeta {
	address: string
	tokenType: string
	symbol: string
	name: string
	metadata: string
	totalSupply: string
}

export interface ERC20Meta {
	address: string
	symbol: string
	name: string
	decimals: number
	totalSupply: number
}

export class TokenFrontService {

	public getNFT(contract: string, chainId: number, tokenId: string): Promise<Nft> {
		const query = `{
        nft(contract: "${contract}", chainId: ${chainId}, tokenId: "${tokenId}")   {
					owner
					tokenAddress
					tokenId
					tokenType
					symbol
					name
					balance
					metadata
					totalSupply
					contractMetadata
				}
    }`
		return this.graphqlRequest(query);
	}

	public getAllNFTs(contracts: string[], chainId: number, account?: string, max?: number, offset?: number, verbose?: true): Promise<Nft[]> {
		const query = `{
			allNfts(contracts: "${contracts}", chainId: ${chainId}, account: "${account}", max: ${max}, offset: ${offset}, verbose: ${verbose}) {
					owner
					tokenAddress
					tokenId
					tokenType
					symbol
					name
					balance
					metadata
					totalSupply
					contractMetadata
		
			}
		}`
		return this.graphqlRequest(query);
	}

	public getContractMeta(contract: string, chainId: number): Promise<ContractMeta> {
		const query = `{
			contractMetadata(contract: "${contract}", chainId: ${chainId}}) {
				address
				tokenType
				symbol
				name
				metadata
				totalSupply
			}
		}`
		return this.graphqlRequest(query);
	}

	public getERC20Meta(contract: string, chainId: number): Promise<ERC20Meta> {
		const query = `{
			erc20Metadata(contract: "${contract}", chainId: ${chainId}) {
				address
				tokenType
				symbol
				name
				metadata
				totalSupply
			}
		}`
		return this.graphqlRequest(query);
	}

	private async graphqlRequest(query: string): Promise<any> {
		const requestBody = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ query })
		}
		const res = await fetch(GRAPHQL_API, requestBody);
		try {

			if (!res.ok) {
				throw new Error(res.statusText);
			}

			return res.json();
		} catch (error) {
			throw new Error(error);
		}
	}
}