import { Messaging as CoreMessaging, RequestInterfaceBase, ResponseInterfaceBase } from "../core/messaging";
import { Ui } from "./ui";
export declare enum OutletAction {
    MAGIC_URL = "magic-url",
    GET_ISSUER_TOKENS = "get-issuer-tokens",
    GET_PROOF = "get-proof",
    GET_PROOF_CALLBACK = "proof-callback",
    EMAIL_ATTEST_CALLBACK = "email-callback"
}
export declare enum OutletResponseAction {
    ISSUER_TOKENS = "issuer-tokens",
    PROOF = "proof"
}
export declare class Messaging {
    core: CoreMessaging;
    sendMessage(request: RequestInterfaceBase, forceTab?: boolean, ui?: Ui, redirectUrl?: false | string): Promise<ResponseInterfaceBase>;
    private handleUserClose;
    private createNamedError;
}
