
import OverlayService from "./../overlayService";
import { config } from "./../../config/index";

describe('overlay service Spec', () => {
  test('expect overlayService to exist', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, {}, {}); 
    expect(overlayService ? true : false).toEqual(true);
  });
  test('expect event to not have come from overlay service', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, {}, {}); 
    expect(overlayService.isEventFromOverlay('https://ethereum.org/en/', 'https://polkadot.network/')).toEqual(false);
  });
  test('expect event to have come from overlay service', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, {}, {}); 
    expect(overlayService.isEventFromOverlay('https://ethereum.org/en/', 'https://ethereum.org/en/')).toEqual(true);
  });
  test('expect clickoutside of overlay to be triggered and sub function called', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, {}, {}); 
    // @ts-ignore
    overlayService.refOverlaySelector = { contentWindow: { postMessage: () => {} } };
    overlayService.onClickOutsideOfOverlay({ target: { className: 'mint-eth' } });
  });  
  test('expect set token button html to be appended to element', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, { tokenSelectorContainer: '.test' }, {}); 
    document.body.innerHTML = '<div><div style="margin: 0" append="() => {}" class="test"></div></div>';
    overlayService.eventReciever({ evt: "setTokenButtonHTML" })
  });  
  test('expect overlay close trigger to be invoked', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, { tokenSelectorContainer: '.test' }, {}); 
    document.body.innerHTML = '<div><div style="margin: 0" class="test devcon-ticket-overlay-wrapper-tn"></div></div>';
    overlayService.eventReciever({ evt: "hideOverlay" });
  });  
  test('expect overlay open trigger to be invoked', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, { tokenSelectorContainer: '.test' }, {}); 
    document.body.innerHTML = '<div><div style="margin: 0" class="test devcon-ticket-overlay-wrapper-tn"></div></div>';
    overlayService.eventReciever({ evt: "showOverlay" });
  });  
  test('expect overlay click handler to be invoked', () => {
    const _config = config['devcon-ticket'];
    const overlayService = new OverlayService(_config, { tokenSelectorContainer: '.test' }, {}); 
    overlayService.overlayClickHandler();
  });  

});

