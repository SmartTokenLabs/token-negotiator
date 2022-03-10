import { AbstractView } from "./view-interface";
import { TokenList } from "./token-list";
export declare class SelectIssuers extends AbstractView {
    issuerListContainer: any;
    tokensContainer: any;
    tokenListView: TokenList | undefined;
    render(): void;
    populateIssuers(): void;
    issuerConnectMarkup(title: string, image: string, issuer: string): string;
    backToIssuers(): void;
    connectTokenIssuer(event: any): Promise<void>;
    issuerConnected(issuer: string, tokens: any[]): void;
    navigateToTokensView(event: any): void;
    updateTokensView(issuer: string): void;
    showTokenView(issuer: string): void;
}
