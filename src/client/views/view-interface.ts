import {Client} from "../index";
import {Popup} from "../popup";

export interface ViewConstructor<T> {
    new(client:Client, popup:Popup, viewContainer:any, params:any) : T;
}

export interface ViewInterface {
    render():void;
    init():void;
    update(params:any):void;
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
        this.init();
    }

    public init(): void {

    }

    abstract render(): void;

    public update(params:any): void {
        this.params = params;
        this.render();
    }
}