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

export abstract class AbstractView implements ViewInterface {
	client: Client;
	ui: Ui;
	viewContainer: any;
	params: any = {};

	constructor(client: Client, popup: Ui, viewContainer: any, params: any) {
		this.client = client;
		this.ui = popup;
		this.viewContainer = viewContainer;
		this.params = params;
		this.init();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public init(): void { /* TODO document why this method 'init' is empty */ }

	abstract render(): void;

	public update(params: any): void {
		this.params = params;
		this.render();
	}
}
