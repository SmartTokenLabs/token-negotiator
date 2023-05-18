import { Client } from '../index'
import { Ui, UIOptionsInterface } from '../ui'

export interface ViewConstructor<T> {
	new (client: Client, popup: Ui, viewContainer: any, params: any): T
}

export type ViewFactory = (client: Client, popup: Ui, viewContainer: any, params: any) => ViewInterface

export type ViewComponent = ViewFactory | ViewConstructor<ViewInterface>

export interface ViewInterface {
	client: Client
	ui: Ui
	viewContainer: HTMLDivElement | any
	params: IViewParameters
	render(): void
	init(): void
	update(params: IViewParameters): void
}

export interface IViewParameters {
	options: UIOptionsInterface | any
	viewOptions: any
	data?: any
}

export abstract class AbstractView implements ViewInterface {
	client: Client
	ui: Ui
	viewContainer: HTMLDivElement | any
	params: IViewParameters

	constructor(client: Client, popup: Ui, viewContainer: HTMLDivElement | any, params: IViewParameters) {
		this.client = client
		this.ui = popup
		this.viewContainer = viewContainer
		this.params = params
		this.init()
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public init(): void {}

	abstract render(): void

	public update(params: Partial<IViewParameters>): void {
		this.params = { ...this.params, ...params }
		this.render()
	}
}
