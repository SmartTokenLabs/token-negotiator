import NegotiatorService from "./negotiatorService";
import { applyDevelopmentMode } from "./devUtils";
export class Overlay {
    constructor() {
        const negotiatorOverlayService = new NegotiatorService();
        window.addEventListener('message', function (event) { negotiatorOverlayService.eventReciever(event.data); }, false);
        window.tokenToggleSelection = () => {
            let output = [];
            document.querySelectorAll('.token .mobileToggle').forEach((token) => {
                if (token.checked === true)
                    output.push(JSON.parse(token.dataset.token));
            });
            negotiatorOverlayService.selectedTokens = output;
            negotiatorOverlayService.eventSender.emitSelectedTokens();
        };
        if (window.top === window.self)
            applyDevelopmentMode('devcon-ticket', ".tokenSelectorContainerElement", "http://localhost:3002/", "dcTokens", negotiatorOverlayService);
    }
}
;
