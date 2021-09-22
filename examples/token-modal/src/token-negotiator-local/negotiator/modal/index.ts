// @ts-ignore
import NegotiatorService from "./negotiatorService";
// TODO - should only be injected when running webpack development server
import { applyDevelopmentMode } from "./devUtils";
export class Modal {

  constructor() {
    // custom to modal
    const negotiatorModalService = new NegotiatorService();

    // assign incoming events
    window.addEventListener('message', function(event) { negotiatorModalService.eventReciever(event.data); }, false);

    // tokenToggleSelection = Global modal token selection toggle event from top client window

    // @ts-ignore
    window.tokenToggleSelection = () => {
      let output: any = [];
      document.querySelectorAll('.token .mobileToggle').forEach((token: any) => {
        if (token.checked === true) output.push(JSON.parse(token.dataset.token));
      });
      negotiatorModalService.selectedTokens = output;
      negotiatorModalService.eventSender.emitSelectedTokens();
    }

    // DEV MODE ONLY: Enabling live css / development changes
    if (window.top === window.self) applyDevelopmentMode(negotiatorModalService);
  };


};