import "./css/style.css";
import clientStateService from './clientStateService';
import clientComponents from "./clientHTMLComponents";
import { tokenBuilder } from "./tokenBuilder";

// @ts-ignore
import { Negotiator } from './token-negotiator-local';

// This script acts like a controller / manager. Creating an instance of:
// clientStateService - which handles the state of the data which is exposed to the client
// eventService - which handles event listeners and communication between the token outlet and client

// TODO: this url must be compared inside the token Negotiator
// when matched the tokens will be provided to this component.
// when the tokens are activated, they will be dispatched to the 
// client website.
const locationUrl = document.location.href;

// const mockTokens = [
//   { ticketClass: 'a', ticketId: 'b', devconId: 'c' },
//   { ticketClass: 'd', ticketId: 'e', devconId: 'f' },
//   { ticketClass: 'g', ticketId: 'h', devconId: 'i' },
//   { ticketClass: 'i', ticketId: 'j', devconId: 'k' },
//   { ticketClass: 'l', ticketId: 'm', devconId: 'n' },
// ];

// Service to handle the state of the selected tokens
const _clientStateService = new clientStateService();
// Client components (token button)
const _clientComponents = new clientComponents();
// Modal components for this part of the negotiator
let _modalComponents; // = new tokenBuilder(mockTokens);

// apply the tokenName to negotiate tokens from e.g. devcon-ticket.
const tokenName = "devcon-ticket";

// add filters when specific tokens are required
const filter = {};

// set required negotiator options
const options = {
  tokenSelectorContainer: ".tokenSelectorContainerElement"
};

// create new instance of the Negotiator with params
const negotiator = new Negotiator(filter, tokenName, options);

negotiator.negotiate().then((results:any) => {
  if(results.tokens) {
    addTokens(results.tokens.map((data:any, index:number) => {
      return tokenBuilder(data, index);
    }).join(''));
  } else {
    addTokens('<p style="padding: 0 18px">No tokens available.</p>');
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

// Handle Event Business Logic
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
      // defines the tokens that are available to the website
      const toggleModalState = toggleTokenButtonHandler();
      // TODO: review if this is needed.
      window.top.postMessage({ evt: 'setToggleModal', state: toggleModalState }, "*");
      break;
  }
}

const toggleTokenButtonHandler = () => {
  const element = document.querySelector(".dvn-tk-outlt .modal");
  element.classList.toggle("open");
  if(element.classList.contains("open")) {
    element.classList.add("open");
    return 'open';
  } else {
    element.classList.remove("open");
    return 'close';
  }
}



// NOTES:

/*

Token Negotiator (modules within NPM package - code splitting will remove unused code per use case): 

{ negotiator } - negotiate(), tokenEventListener(), toggleModalEventDispatcher()
{ modal }  - getTokenInstances(), toggleToken(), toggleModalListener(), tokenEventDispatcher()

*/