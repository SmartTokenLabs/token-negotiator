// // @ts-ignore
// import { tokenConfig } from "./../tokenConfig";
// // @ts-ignore
// import { base64ToUint8array } from './../utils';
// import ModalTokenStateService from './modalTokenStateService';
// import ComponentFactory from "./componentFactory";
// import componentFactory from "./componentFactory";

// class ModalEventController {
//   modalTokenStateService: ModalTokenStateService;

//   constructor() {
//     this.modalTokenStateService = new ModalTokenStateService();
//     window.addEventListener('message', function(event) { this.modalEventReciever(event.data); }, false);
//   }

//   modalEventReciever(data:any) {
//     switch(data.evt) {
//       case 'getTokenButtonHTML':
//         // TODO - expects entire config as per mock
//         const dataEvtMock = { evt: { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } } } ;
//         initNegotiator(dataEvtMock.evt);
//         modalEventSender.emitTokenButtonHTML();
//         break;
//       case 'setSelectedTokens':
//         modalEventSender.emitSelectedTokens();
//         break;
//       case 'setToggleModalHandler':
//         modalEventSender.emitModalToggleState();
//         break;
//     }
//   }

//     modalEventSender = {
//     emitTokenButtonHTML: () => {
//       window.top.postMessage({ 
//         evt: 'setTokenButtonHTML', 
//         button: ComponentFactory.createFabButton(`${document.location.href}/theme/fab-button.svg`)
//       }, "*");
//     },
//     emitSelectedTokens: () => {
//       window.top.postMessage({ 
//         evt: 'setSelectedTokens', 
//         selectedTokens: this.modalTokenStateService.selectedTokens
//       },
//       "*");
//     },
//     // @ts-ignore
//     modalClickTimer: null, 
//     emitModalToggleState: () => {
//       const toggleModalState = modalClickHandler();
//       // @ts-ignore
//       clearTimeout(this.modalClickTimer);
//       if(toggleModalState === 'close') {
//         // @ts-ignore
//         this.modalClickTimer = setTimeout(() => {
//           window.top.postMessage({ evt: 'hideModal', state: toggleModalState }, "*");
//         }, 1000);
//       } else {
//         window.top.postMessage({ evt: 'showModal', state: toggleModalState }, "*");
//       }
//     }
//   }
// }