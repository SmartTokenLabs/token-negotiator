import { AbstractView } from "./view-interface";
export declare class Start extends AbstractView {
    render(): void;
    renderMainTemplate(): string;
    goToWalletSelection(): Promise<void>;
}
