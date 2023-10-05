export class EventHookHandler {
	subIds: number
	subscriptions: { [eventName: string]: { [token: number]: (data: any) => void } }

	constructor() {
		this.subIds = 0
		this.subscriptions = {}
	}

	subscribe(eventName: string, fn: (data: any) => void) {
		if (!this.subscriptions[eventName]) this.subscriptions[eventName] = {}
		const token = ++this.subIds
		this.subscriptions[eventName][token] = fn
		return () => this.unsubscribe(eventName, token)
	}

	unsubscribe(eventName: string, token: number) {
		if (!token) delete this.subscriptions[eventName]
		this.subscriptions[eventName] && delete this.subscriptions[eventName][token]
	}

	trigger(eventName: string, data: any) {
		this.publish(eventName, data)
		return data
	}

	publish(eventName, data) {
		const subs = this.subscriptions[eventName]
		if (!subs) {
			return false
		}
		Object.values(subs).forEach((sub) => sub(data))
	}
}
