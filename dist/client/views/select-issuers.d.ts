import { AbstractView } from "./view-interface";
import { TokenList } from "./token-list";
export declare class SelectIssuers extends AbstractView {
    issuerListContainer: any;
    tokensContainer: any;
    tokenListView: TokenList | undefined;
    init(): void;
    render(): void;
    issuersLoading(): void;
    populateIssuers(): void;
    issuerConnectMarkup(title: string, image: string | undefined, issuer: string, tokens: [] | null): string;
    backToIssuers(): void;
    autoLoadTokens(): Promise<void>;
    connectTokenIssuer(event: any): Promise<void>;
    issuerLoading(issuer: string): void;
    issuerConnected(issuer: string, tokens: any[], showTokens?: boolean): void;
    navigateToTokensView(issuer: string): void;
    updateTokensView(issuer: string): void;
    showTokenView(issuer: string): void;
}
