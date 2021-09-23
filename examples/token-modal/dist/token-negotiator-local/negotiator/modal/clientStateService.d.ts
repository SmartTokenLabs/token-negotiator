declare class ClientTokenService {
    state: {
        data: {
            selectedTokens: any[];
        };
    };
    constructor();
    get selectedTokens(): any[];
    set selectedTokens(tokens: any[]);
}
export default ClientTokenService;
