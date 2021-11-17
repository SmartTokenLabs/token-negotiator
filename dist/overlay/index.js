import NegotiatorService from "./negotiatorService";
import { applyDevelopmentMode } from "./devUtils";
var Overlay = (function () {
    function Overlay() {
        var negotiatorOverlayService = new NegotiatorService();
        window.addEventListener('message', function (event) {
            negotiatorOverlayService.eventReciever(event.data);
        }, false);
        window.tokenToggleSelection = function () {
            var output = [];
            document.querySelectorAll('.token .mobileToggle').forEach(function (token) {
                if (token.checked === true)
                    output.push(JSON.parse(token.dataset.token));
            });
            negotiatorOverlayService.selectedTokens = output;
            negotiatorOverlayService.eventSender.emitSelectedTokens();
        };
        applyDevelopmentMode(negotiatorOverlayService, 'devcon-ticket', ".tokenSelectorContainerElement", "http://localhost:3002/", "dcTokens");
    }
    return Overlay;
}());
export { Overlay };
//# sourceMappingURL=index.js.map