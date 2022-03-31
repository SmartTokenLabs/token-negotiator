import {attachPostMessageListener, removePostMessageListener} from "../utils";

// TODO move Message related interfaces/enum in to shared location /core 

export interface MessageRequestInterface {
    issuer:string,
    action:MessageAction,
    origin:string,
    timeout?:number,
    filter?:string[],
    token?:string
}

export enum MessageAction {
    COOKIE_CHECK = "cookie-check",
    GET_ISSUER_TOKENS = "get-issuer-tokens",
    GET_PROOF = "get-proof"
}

export interface MessageResponseInterface {
    evtid: any,
    evt: string,
    issuer?: string,
    tokens?:[],
    proof?:any,
    thirdPartyCookies?:any,
    errors?:any[]|undefined
}

export enum MessageResponseAction {
    COOKIE_CHECK = "cookie-check",
    ISSUER_TOKENS = "issuer-tokens",
    PROOF = "proof",
    ERROR = "error",
    SHOW_FRAME = "show-frame" // User input required in the iframe - don't resolve promise yet, setup iframe view if required.
    //USER_CANCEL = "user_cancel" Could be handled different to an error
}

export class Messaging {

    iframeStorageSupport:null|boolean = null;
    requestQueue = {};

    constructor() {
        // Should we just check cookie support on initialisation or when requested?
    }

    async sendMessage(request:MessageRequestInterface){

        if (this.iframeStorageSupport === null)
            this.iframeStorageSupport = await this.thirdPartyCookieSupportCheck(request.origin);

        // Uncomment to test popup mode
        //this.iframeStorageSupport = false;

        console.log("Send request: ");
        console.log(request);

        if (this.iframeStorageSupport){
            return this.sendIframe(request);
        } else {
            return this.sendPopup(request);
        }
    }

    private sendIframe(request:MessageRequestInterface){

        return new Promise((resolve, reject) => {

            let id = Messaging.getUniqueEventId();
            let url = this.constructUrl(id, request);

            let iframe = this.createIframe();

            //this.openIframe(url).then((iframeRef:any) => {

                // TODO: iframe error handling here
                //if (iframeRef) {

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

                    // TODO: Is this required? won't the URL trigger it?
                    /*iframeRef.contentWindow.postMessage({
                        evt: 'getTokens'
                    }, request.origin);*/

                //}

            //});

            iframe.src = url;

        });
    }

    private sendPopup(request:MessageRequestInterface){

        return new Promise((resolve, reject) => {

            let id = Messaging.getUniqueEventId();

            var tabRef:any = null;

            this.setResponseListener(id, request.origin, request.timeout, resolve, reject, ()=>{
                if (tabRef)
                    tabRef.close();
            });

            tabRef = this.openTab(this.constructUrl(id, request));

        });

    }

    private setResponseListener(id:any, origin:string, timeout:number|undefined, resolve:any, reject:any, cleanUpCallback:any, iframe:any = null){

        let received = false;
        let timer:any = null;

        let listener = (event: any) => {

            let response:MessageResponseInterface = event.data;
            let requestUrl = new URL(origin);

            if (response.evtid == id) {

                if (requestUrl.origin == event.origin){

                    console.log("event response received");
                    console.log(event.data);

                    received = true;

                    if (response.evt == MessageResponseAction.ERROR) {
                        reject(response.errors);
                    } else if (response.evt == MessageResponseAction.SHOW_FRAME){

                        if (iframe) {
                            let modal = this.getModal();
                            modal.style.display = "block";
                        }

                        return;
                    } else {
                        resolve(event.data);
                    }

                    if (timer)
                        clearTimeout(timer);
                    afterResolveOrError();

                } else {
                    console.log("Does not match origin " + event.origin);
                }
            }
        }

        let afterResolveOrError = () => {
            removePostMessageListener(listener);
            cleanUpCallback();
        };

        attachPostMessageListener(listener);

        if (timeout == undefined)
            timeout = 5000;

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
            if (modal)
                modal.style.display = "none";
        });

        return modal;
    }

    async getCookieSupport(testOrigin:string){
        if (this.iframeStorageSupport === null)
            this.iframeStorageSupport = await this.thirdPartyCookieSupportCheck(testOrigin);

        return this.iframeStorageSupport;
    }

    private thirdPartyCookieSupportCheck(origin:string):Promise<boolean> {

        // TODO SML's host a webpage with cache that we use to test cookies
        // This so we don't need to check if the TN is using On/Off chain tokens etc.

        //if(this.offChainTokens.tokenKeys.length) {
        return new Promise((resolve, reject) => {

            let id = Messaging.getUniqueEventId();
            let url = origin + '?action=' + MessageAction.COOKIE_CHECK +'&evtid=' + id;

            let iframe = this.createIframe();


            //this.openIframe(url).then((iframeRef:any) => {

                this.setResponseListener(
                    id,
                    origin,
                    5000,
                    (responseData:any)=>{
                        resolve(!!responseData.thirdPartyCookies);
                    },
                    reject,
                    () => {
                        if (iframe?.parentNode)
                            iframe.parentNode.removeChild(iframe);
                    }
                );

                console.log("listener set");
            //});

            iframe.src = url;

        });

    }

    private constructUrl(id:any, request:MessageRequestInterface){

        let url = `${request.origin}?evtid=${id}&action=${request.action}`;

        if (request.filter)
            url += `&filter=${JSON.stringify(request.filter)}`;

        if (request.token)
            url += `&token=${JSON.stringify(request.token)}`;

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

        //return new Promise((resolve, reject) => {

            const iframe = document.createElement('iframe');

            let modal = this.getModal();

            modal.getElementsByClassName('modal-body-tn')[0].appendChild(iframe);

            // TODO: Do we need a callback to close tab in Client::addTokenThroughIframe
            /*iframe.onload = () => {
                console.log("Frame loaded");
                resolve(iframe);
            };*/

            if (url)
                iframe.src = url;

            return iframe;
        //});
    }

    private static getUniqueEventId(){
        return new Date().getTime();
    }
}