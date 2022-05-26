import {attachPostMessageListener, logger, removePostMessageListener} from "../utils";

// TODO move Message related interfaces/enum in to shared location /core 

export interface RequestInterfaceBase {
    action: MessageActionBase | string,
	origin: string,
	timeout?: number,
	data: {[key: string]: any}
}

export enum MessageActionBase {
    COOKIE_CHECK = "cookie-check"
}

export interface ResponseInterfaceBase {
    evtid: any,
    evt: ResponseActionBase | string,
    data?: {[key: string]: any},
	errors?: string[]
}

export enum ResponseActionBase {
	COOKIE_CHECK = "cookie-check",
    ERROR = "error",
    SHOW_FRAME = "show-frame" // User input required in the iframe - don't resolve promise yet, setup iframe view if required.
    // USER_CANCEL = "user_cancel" Could be handled different to an error
}

declare global {
    interface Window {
        NEGOTIATOR_DEBUG: boolean;
        safari?: any
    }
}

export class Messaging {

	iframeStorageSupport: null|boolean = null;
	rejectHandler: Function|null = null;

	constructor() {
		// Should we just check cookie support on initialisation or when requested?
	}

	async sendMessage(request: RequestInterfaceBase, forceTab = false): Promise<ResponseInterfaceBase> {

		if (!forceTab && this.iframeStorageSupport === null) {
			if (window.safari)
				this.iframeStorageSupport = false;
		}

		// Uncomment to test popup mode
		// this.iframeStorageSupport = false;

		logger(2,"Send request: ");
		logger(2,request);

		if (!forceTab && this.iframeStorageSupport !== false){
			try {
				return await this.sendIframe(request);
			} catch (e){
				if (e === "IFRAME_STORAGE"){
					return this.sendPopup(request);
				}
				throw e;
			}
		} else {
			return this.sendPopup(request);
		}
	}

	private sendIframe(request: RequestInterfaceBase): Promise<ResponseInterfaceBase>{

		return new Promise((resolve, reject) => {

			let id = Messaging.getUniqueEventId();
			let url = this.constructUrl(id, request);

			let iframe = this.createIframe();

			this.setResponseListener(id, request.origin, request.timeout, resolve, reject,
				()=>{

					if (iframe?.parentNode)
						iframe.parentNode.removeChild(iframe);

					let modal = this.getModal();
					if (modal)
						modal.style.display = "none";
				},
				iframe
			);

			iframe.src = url;

		});
	}

	private sendPopup(request: RequestInterfaceBase): Promise<ResponseInterfaceBase>{

		return new Promise((resolve, reject) => {

			let id = Messaging.getUniqueEventId();

			let tabRef: any = null;

			this.setResponseListener(id, request.origin, request.timeout, resolve, reject, ()=>{
				if (tabRef)
					tabRef.close();
			});

			tabRef = this.openTab(this.constructUrl(id, request));

		});

	}

	private setResponseListener(id: any, origin: string, timeout: number|undefined, resolve: any, reject: any, cleanUpCallback: any, iframe: any = null){

		let received = false;
		let timer: any = null;
		this.rejectHandler = reject;

		let listener = (event: any) => {

			let response: ResponseInterfaceBase = event.data;
			let requestUrl = new URL(origin);

			if (response.evtid === id) {

				if (requestUrl.origin === event.origin){

					logger(2,"event response received");
					logger(2,event.data);

					received = true;

					if (response.evt === ResponseActionBase.COOKIE_CHECK){
						if (!iframe || this.iframeStorageSupport === true)
							return;

						this.iframeStorageSupport = !!response?.data?.thirdPartyCookies;
						if (!this.iframeStorageSupport){
							afterResolveOrError();
							reject("IFRAME_STORAGE");
						}
						return;
					}

					if (response.evt === ResponseActionBase.ERROR) {
						reject(response.errors);
					} else if (response.evt === ResponseActionBase.SHOW_FRAME){

						if (iframe) {
							let modal = this.getModal();
							modal.style.display = "block";
						}

						return;
					} else {
						resolve(response);
					}

					afterResolveOrError();

				} else {
					logger(2,"Does not match origin " + event.origin);
				}
			}
		}

		let afterResolveOrError = () => {
			if (timer)
				clearTimeout(timer);
			removePostMessageListener(listener);
			if (!window.NEGOTIATOR_DEBUG)
				cleanUpCallback();
		};

		attachPostMessageListener(listener);

		if (timeout === undefined)
			timeout = 10000;

		if (timeout > 0)
			timer = setTimeout(()=>{
				if (!received)
					reject("Failed to receive response from window/iframe");
				afterResolveOrError();
			}, timeout);
	}

	private getModal(){

		let modal = document.getElementById("modal-tn");

		if (modal)
			return modal;

		modal = document.createElement('div');
		modal.id = "modal-tn";
		modal.className = "modal-tn";
		modal.style.display = "none";

		modal.innerHTML = `
            <div class="modal-content-tn">
                <div class="modal-header-tn">
                    <span class="modal-close-tn">&times;</span>
                </div>
                <div class="modal-body-tn"></div>
            </div>
        `;

		document.body.appendChild(modal);

		modal.getElementsByClassName('modal-close-tn')[0].addEventListener('click', () => {
			if (modal) {
				modal.style.display = "none";
				// remove content with iframe, because another iframe will be added next time 
				let content = modal.querySelector('.modal-body-tn');
				if (content) {
					content.innerHTML = "";
				}

				if (this.rejectHandler) {
					this.rejectHandler("Popup closed by user");
					this.rejectHandler = null;
				}
			}
		});

		return modal;
	}

	private constructUrl(id: any, request: RequestInterfaceBase){

		let url = `${request.origin}#evtid=${id}&action=${request.action}`;

		for (let i in request.data){
			let value = request.data[i];

			if (!value)
				continue;

			if (value instanceof Array || value instanceof Object){
				url += `&${i}=${JSON.stringify(value)}`;
			} else {
				if (i === "urlParams"){
					url += `&${value}`;
				} else {
					url += `&${i}=${value}`;
				}
			}
		}

		return url;
	}

	public openTab(url: string){
		return window.open(
			url,
			"win1",
			"left=0,top=0,width=320,height=320"
		);
	}

	public createIframe(url?: string) {

		const iframe = document.createElement('iframe');
		iframe.setAttribute('allow',"clipboard-read");

		let modal = this.getModal();

		modal.getElementsByClassName('modal-body-tn')[0].appendChild(iframe);

		if (url)
			iframe.src = url;

		return iframe;
	}

	private static getUniqueEventId(){
		return new Date().getTime().toString();
	}
}