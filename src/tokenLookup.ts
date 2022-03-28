import { SignedDevconTicket } from './Attestation/SignedDevonTicket';

export interface Item {
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
    image?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
    base64senderPublicKey?: string;
    base64attestorPubKey?: string;
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
        image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
        tokenParser: SignedDevconTicket,
        base64senderPublicKey: '-----BEGIN PUBLIC KEY-----\n' +
            'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA////////////////\n' +
            '/////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n' +
            'AAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5m\n' +
            'fvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0\n' +
            'SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFB\n' +
            'AgEBA0IABJUMfAvtI8PKxcwxu7mq2btVMjh4gmcKwrHN8HmasOvHZMJn9wTo/doH\n' +
            'lquDl6TSEBAk0kxO//aVs6QX8u0OSM0=\n' +
            '-----END PUBLIC KEY-----',
        base64attestorPubKey:
        // stage.attestation.id public key
            "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ="
    },
    "devcon-remote": {
        onChain: false,
        tokenIssuerPublicKey: "",
        title: 'Devcon',
        tokenName: 'devcon',
        attestationOrigin: "https://stage.attestation.id/",
        tokenOrigin: "https://tokenscript.github.io/token-negotiator-gh-pages/token-outlet-website/build/",
        tokenUrlName: 'ticket',
        unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
        tokenSecretName: 'secret',
        tokenIdName: 'id',
        unsignedTokenDataName: 'ticket',
        itemStorageKey: 'dcTokens',
        ethKeyitemStorageKey: 'dcEthKeys',
        image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
        tokenParser: SignedDevconTicket,
        base64senderPublicKey: '-----BEGIN PUBLIC KEY-----\n' +
            'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA////////////////\n' +
            '/////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n' +
            'AAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5m\n' +
            'fvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0\n' +
            'SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFB\n' +
            'AgEBA0IABJUMfAvtI8PKxcwxu7mq2btVMjh4gmcKwrHN8HmasOvHZMJn9wTo/doH\n' +
            'lquDl6TSEBAk0kxO//aVs6QX8u0OSM0=\n' +
            '-----END PUBLIC KEY-----',
        base64attestorPubKey:
        // stage.attestation.id public key
            "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ="
    }
}
