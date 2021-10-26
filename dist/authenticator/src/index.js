import { Authenticator } from "./Authenticator";
import { Eip712AttestationRequest } from "./libs/Eip712AttestationRequest";
import { AttestationCrypto } from "./libs/AttestationCrypto";
window.Authenticator = Authenticator;
window.Attest = Eip712AttestationRequest;
window.AttestationCrypto = AttestationCrypto;
