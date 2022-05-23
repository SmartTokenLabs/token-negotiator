// Enums for Client/Outlet messaging

export enum OutletAction {
    MAGIC_URL = "magic-url",
    GET_ISSUER_TOKENS = "get-issuer-tokens",
    GET_PROOF = "get-proof"
}

export enum OutletResponseAction {
    ISSUER_TOKENS = "issuer-tokens",
    PROOF = "proof"
}