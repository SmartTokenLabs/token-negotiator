import { AbstractView } from "./view-interface";
export interface TokenListItemInterface {
    tokenIssuerKey: string;
    title: string;
    index: number;
    image: string;
    data: any;
    toggleState: boolean;
}
export declare class TokenList extends AbstractView {
    loadedCount: number;
    numberToLoad: number;
    autoLoadMore: boolean;
    interceptObs: IntersectionObserver | undefined;
    init(): void;
    render(): void;
    getTokenListItems(): string;
    loadMoreTokens(): void;
    private renderIcons;
    tokenToggleSelection(): void;
    createLoadMoreMarkup(): string;
    createTokenMarkup(config: TokenListItemInterface): string;
}
