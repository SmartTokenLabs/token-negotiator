import { Client } from "../index";
import { Popup } from "../popup";
export interface ViewConstructor<T> {
    new (client: Client, popup: Popup, viewContainer: any, params: any): T;
}
export interface ViewInterface {
    render(): void;
    init(): void;
    update(params: any): void;
}
export declare abstract class AbstractView implements ViewInterface {
    client: Client;
    popup: Popup;
    viewContainer: any;
    params: any;
    constructor(client: Client, popup: Popup, viewContainer: any, params: any);
    init(): void;
    abstract render(): void;
    update(params: any): void;
}
