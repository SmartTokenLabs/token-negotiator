import "./css/style.css";
import clientStateService from './clientStateService';
import clientComponents from "./clientHTMLComponents";
import { tokenBuilder } from "./tokenBuilder";

// @ts-ignore
import { Negotiator } from './token-negotiator-local';

// Service to handle the state of the selected tokens
const _clientStateService = new clientStateService();
// Client components (token button)
const _clientComponents = new clientComponents();
// Modal components for this part of the negotiator

// apply the tokenName to negotiate tokens from e.g. devcon-ticket.
const tokenName = "devcon-ticket";
// add filters when specific tokens are required
const filter = {};
// set required negotiator options
const options = { tokenSelectorContainer: ".tokenSelectorContainerElement" };
// create new instance of the Negotiator with params
const negotiator = new Negotiator(filter, tokenName, options);

negotiator.negotiate().then((results:any) => {
  if(results.tokens) {
    addTokens(results.tokens.map((data:any, index:number) => {
      return tokenBuilder(data, index);
    }).join(''));
  }
});

const tokenContainer = document.querySelector('.dvn-tk-outlt .token-container');

function addTokens(str:string) {
  tokenContainer.innerHTML = str;
}

// Handle Incoming Event Requests From Parent Window.
window.addEventListener('message', function(event) {
  // if(event.origin !== '*') return; // review if we should whitelist access some events.
  eventManager(event.data);
},false);

// toggle open and close the Modal
const modalClickHandler = () => {
  const element = document.querySelector(".dvn-tk-outlt .modal");
  const isOpen = element.classList.contains("open");
  element.classList.toggle("open");
  if(!isOpen) {
    window.top.postMessage({ evt: 'hideModal', state: 'open' }, "*");
    element.classList.add("open");
    return 'open';
  } else {
    window.top.postMessage({ evt: 'hideModal', state: 'close' }, "*");
    element.classList.remove("open");
    return 'close';
  }
}

// Handle Event Business Logic Modal Event trigger to Top.
let fadeoutTimer:any = null;
function eventManager(data:any) {
  switch(data.evt) {
    case 'getTokenButtonHTML':
      window.top.postMessage({ evt: 'setTokenButtonHTML', button: _clientComponents.button }, "*");
      break;
    case 'setSelectedTokens':
      // defines the tokens that are available to the website
      window.top.postMessage({ evt: 'setSelectedTokens', selectedTokens: _clientStateService.selectedTokens }, "*");
      break;
    case 'setToggleModalHandler':
      const toggleModalState = modalClickHandler();
      clearTimeout(fadeoutTimer);
      if(toggleModalState === 'close') {
        fadeoutTimer = setTimeout(() => {
          window.top.postMessage({ evt: 'hideModal', state: toggleModalState }, "*");
        }, 1000);
      } else {
        window.top.postMessage({ evt: 'showModal', state: toggleModalState }, "*");
      }
      break;
  }
}

// this function is designed to gather the latest state from the UI
// of activated tokens, then present them to the event manager
// which will dispatch the tokens back to the client.
window['tokenSelection'] = (event:any) => {
  var output:any = [];
  document.querySelectorAll('.token .mobileToggle').forEach((token:any) => {
    if(token.checked === true) {
      output.push(JSON.parse(token.dataset.token));
    }
  });
  _clientStateService.selectedTokens = output;
  eventManager({ evt: 'setSelectedTokens' });
}
