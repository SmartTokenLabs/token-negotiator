
const GRAPHQL_API = "https://test-api.tokenfront.tokenscript.org/graphiql";

export class TokenFrontService {

	public getNFTCollection(contract: string, chainId: number, tokenId: string) {
		const query = `{
        nft(contract: ${contract}, chainId: ${chainId}, tokenId: ${tokenId})  
    }`
		return this.graphqlRequest(query);
	}

	private async graphqlRequest(query: string): Promise<unknown> {
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