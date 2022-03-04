import {Client} from "../index";
import {Popup} from "../popup";

export interface ViewConstructor<T> {
    new(client:Client, popup:Popup, viewContainer:any, params:any) : T;
}

export interface ViewInterface {
    render():void;
}

export abstract class AbstractView implements ViewInterface {

    client:Client;
    popup:Popup;
    viewContainer:any;
    params:any = {};

    constructor(client:Client, popup:Popup, viewContainer:any, params:any) {
        this.client = client;
        this.popup = popup;
        this.viewContainer = viewContainer;
        this.params = params;
    }

    abstract render(): void;
}