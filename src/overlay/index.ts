// @ts-nocheck
import NegotiatorService from "./negotiatorService";
// TODO - should only be injected when running webpack development server
import { applyDevelopmentMode } from "./devUtils";
export class Overlay {

  constructor() {

    // custom to overlay
    const negotiatorOverlayService = new NegotiatorService();

    // assign incoming event requests
    window.addEventListener('message', function(event) { 
      // TODO rework this so the Overlay learns the token origin.
      // if (
      //   event.origin !== tokensOrigin ||
      //   event.origin !== document.referrer
      // ) reject();
      negotiatorOverlayService.eventReciever(event.data); 
    }, false);

    // tokenToggleSelection = Global overlay token selection toggle event from top client window

    // @ts-ignore
    window.tokenToggleSelection = () => {
      let output: any = [];
      document.querySelectorAll('.token .mobileToggle').forEach((token: any) => {
        if (token.checked === true) output.push(JSON.parse(token.dataset.token));
      });
      negotiatorOverlayService.selectedTokens = output;
      negotiatorOverlayService.eventSender.emitSelectedTokens();
    }

    // DEV MODE ONLY: Enabling live css / development changes
    if (window.top === window.self) applyDevelopmentMode(
      'devcon-ticket',
      ".tokenSelectorContainerElement",
      "http://localhost:3002/",
      "dcTokens",
      negotiatorOverlayService,
    );
  }


};