import { Messaging as CoreMessaging, RequestInterfaceBase, ResponseInterfaceBase } from "../core/messaging";
import { Ui } from "./ui";
export declare enum OutletAction {
    MAGIC_URL = "magic-url",
    GET_ISSUER_TOKENS = "get-issuer-tokens",
    GET_PROOF = "get-proof"
}
export declare enum OutletResponseAction {
    ISSUER_TOKENS = "issuer-tokens",
    PROOF = "proof"
}
export declare class Messaging {
    core: CoreMessaging;
    sendMessage(request: RequestInterfaceBase, forceTab?: boolean, ui?: Ui): Promise<ResponseInterfaceBase>;
    private handleUserClose;
    private createNamedError;
}
