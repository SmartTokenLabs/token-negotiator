import { Client } from "../index";
import { Ui } from "../ui";
export interface ViewConstructor<T> {
    new (client: Client, popup: Ui, viewContainer: any, params: any): T;
}
export interface ViewInterface {
    render(): void;
    init(): void;
    update(params: any): void;
}
export declare abstract class AbstractView implements ViewInterface {
    client: Client;
    ui: Ui;
    viewContainer: any;
    params: any;
    constructor(client: Client, popup: Ui, viewContainer: any, params: any);
    init(): void;
    abstract render(): void;
    update(params: any): void;
}
