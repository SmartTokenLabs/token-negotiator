import { AbstractView } from "./view-interface";
export declare class SelectWallet extends AbstractView {
    render(): void;
    connectWallet(e: any): Promise<void>;
}
