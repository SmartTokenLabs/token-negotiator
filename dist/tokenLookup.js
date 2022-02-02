import { SignedDevconTicket } from './Attestation/SignedDevonTicket';
export var tokenLookup = {
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
};
//# sourceMappingURL=tokenLookup.js.map