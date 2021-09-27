import NegotiatorService from "./negotiatorService";
import { applyDevelopmentMode } from "./devUtils";
export class Modal {
    constructor() {
        const negotiatorModalService = new NegotiatorService();
        window.addEventListener('message', function (event) { negotiatorModalService.eventReciever(event.data); }, false);
        window.tokenToggleSelection = () => {
            let output = [];
            document.querySelectorAll('.token .mobileToggle').forEach((token) => {
                if (token.checked === true)
                    output.push(JSON.parse(token.dataset.token));
            });
            negotiatorModalService.selectedTokens = output;
            negotiatorModalService.eventSender.emitSelectedTokens();
        };
        if (window.top === window.self)
            applyDevelopmentMode('devcon-ticket', ".tokenSelectorContainerElement", "http://localhost:3002/", "dcTokens", negotiatorModalService);
    }
}
;
