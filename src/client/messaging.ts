// Enums for Client/Outlet messaging

export enum OutletAction {
    COOKIE_CHECK = "cookie-check",
    MAGIC_URL = "magic-url",
    GET_ISSUER_TOKENS = "get-issuer-tokens",
    GET_PROOF = "get-proof"
}

export enum OutletResponseAction {
    COOKIE_CHECK = "cookie-check",
    ISSUER_TOKENS = "issuer-tokens",
    PROOF = "proof"
}