import { SignedDevconTicket } from './Attestation/SignedDevonTicket';

interface Item {
    onChain: any;
    tokenIssuerPublicKey?: any;
    title?: any;    
    tokenName?: any;
    attestationOrigin?: any;
    tokenOrigin?: any;
    tokenUrlName?: any;
    tokenSecretName?: any;
    tokenIdName?: any;
    unsignedTokenDataName?: any;
    itemStorageKey?: any;
    ethKeyitemStorageKey?: any;
    emblem?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
}

interface TokenLookupInterface {
    [issuer: string]: Item
}

// TODO - this should be a stateful service that is enriched
// with token data from issuers / on and off chain.

export const tokenLookup:TokenLookupInterface = {
    "devcon": {
        onChain: false,
        tokenIssuerPublicKey: "",
        title: 'Devcon',
        tokenName: 'devcon-ticket-local-3002',
        attestationOrigin: "https://stage.attestation.id/",
        tokenOrigin: "http://localhost:3002/",
        tokenUrlName: 'ticket',
        unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
        tokenSecretName: 'secret',
        tokenIdName: 'id',
        unsignedTokenDataName: 'ticket',
        itemStorageKey: 'dcTokens',
        ethKeyitemStorageKey: 'dcEthKeys',
        emblem: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
        tokenParser: SignedDevconTicket
    },
    "devcon-remote": {
        onChain: false,
        tokenIssuerPublicKey: "",
        title: 'Devcon',
        tokenName: 'devcon',
        attestationOrigin: "https://stage.attestation.id/",
        tokenOrigin: "https://tokenscript.github.io/token-negotiator-examples/github-pages-use-only/token-outlet-website/build/",
        tokenUrlName: 'ticket',
        unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
        tokenSecretName: 'secret',
        tokenIdName: 'id',
        unsignedTokenDataName: 'ticket',
        itemStorageKey: 'dcTokens',
        ethKeyitemStorageKey: 'dcEthKeys',
        emblem: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
        tokenParser: SignedDevconTicket
    }
}
