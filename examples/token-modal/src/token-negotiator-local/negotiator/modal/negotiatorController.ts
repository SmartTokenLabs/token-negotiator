// @ts-ignore
import NegotiatorService from "./negotiatorService";

const negotiatorService = new NegotiatorService();

window.addEventListener('message', function(event) { modalEventReciever(event.data); }, false);

const modalEventReciever = (data: any) => {
  switch (data.evt) {
    case 'getTokenButtonHTML':

      // TODO must be configured by client
      const dataEvtMock = { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } };

      appendModalContent();
      applyModalAnimationSmoothing();

      negotiatorService.configuration = {
        filter: dataEvtMock.filter,
        tokenName: dataEvtMock.tokenName,
        options: dataEvtMock.options
      };

      negotiatorService.getTokens({
        filter: {},
        tokenName: "devcon-ticket",
        tokensOrigin: "http://localhost:3002/",
        localStorageItemName: "dcTokens",
        tokenParser: negotiatorService.config.tokenParser,
        unsignedTokenDataName: negotiatorService.config.unsignedTokenDataName
      }).then((resultTokens: any) => {

        addTokens(resultTokens.tokens);
        modalEventSender.emitTokenButtonHTML();

      });

      break;
    case 'setSelectedTokens':
      modalEventSender.emitSelectedTokens();
      break;
    case 'setToggleModalHandler':
      modalEventSender.emitModalToggleState();
      break;
  }
}

const modalEventSender = {
  emitTokenButtonHTML: () => {
    window.top.postMessage({
      evt: 'setTokenButtonHTML',
      button: negotiatorService.createFabButton(`${document.location.href}/theme/fab-button.svg`)
    }, "*");
  },
  emitSelectedTokens: () => {
    window.top.postMessage({
      evt: 'setSelectedTokens',
      selectedTokens: negotiatorService.selectedTokens
     },
    "*");
  },
  // @ts-ignore
  modalClickTimer: null,
  emitModalToggleState: () => {
    const toggleModalState = modalClickHandler();
    // @ts-ignore
    clearTimeout(this.modalClickTimer);
    if (toggleModalState === 'close') {
      // @ts-ignore
      this.modalClickTimer = setTimeout(() => {
        window.top.postMessage({ evt: 'hideModal', state: toggleModalState }, "*");
      }, 1000);
    } else {
      window.top.postMessage({ evt: 'showModal', state: toggleModalState }, "*");
    }
  }
}

// UI:

const modalClickHandler = () => {
  const element = document.querySelector(".tk-modal .modal");
  const isOpen = element.classList.contains("open");
  element.classList.toggle("open");
  if (!isOpen) {
    window.top.postMessage({ evt: 'hideModal', state: 'open' }, "*");
    element.classList.add("open");
    return 'open';
  } else {
    window.top.postMessage({ evt: 'hideModal', state: 'close' }, "*");
    element.classList.remove("open");
    return 'close';
  }
}

function addTokens(tokens: any) {
  const tokenContainer = document.querySelector('.tk-modal .token-container');
  addToken(tokenContainer, tokens.map((data: any, index: number) => {
    return negotiatorService.createToken(data, index);
  }).join(''));
}
function addToken(tokenContainer: any, str: string) { tokenContainer.innerHTML = str; };


const applyModalAnimationSmoothing = () => {
  // Smooth transitions after initial page load.
  // @ts-ignore
  document.getElementsByClassName('modal')[0].style.transition = 'all 0.2s ease-out';
}

// Modal token selection toggle event (this is triggered when the end user toggles on/off a token)
// @ts-ignore
window.tokenToggleSelection = () => {
  let output: any = [];
  document.querySelectorAll('.token .mobileToggle').forEach((token: any) => {
    if (token.checked === true) {
      output.push(JSON.parse(token.dataset.token));
    }
  });
  negotiatorService.selectedTokens = output;
  modalEventSender.emitSelectedTokens();
}

const appendModalContent = () => {
  document.querySelector('.tk-modal').innerHTML = negotiatorService.createModalSkeleton();
}

const DEV_MODE = window.top === window.self;

if (DEV_MODE) {

  const dataEvtMock = { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } };

  appendModalContent();
  applyModalAnimationSmoothing();

  negotiatorService.configuration = {
    filter: dataEvtMock.filter,
    tokenName: dataEvtMock.tokenName,
    options: dataEvtMock.options
  };

  negotiatorService.getTokens({
    filter: {},
    tokenName: "devcon-ticket",
    tokensOrigin: "http://localhost:3002/",
    localStorageItemName: "dcTokens",
    tokenParser: negotiatorService.config.tokenParser,
    unsignedTokenDataName: negotiatorService.config.unsignedTokenDataName
  }).then((resultTokens: any) => {

    addTokens(resultTokens.tokens);
    modalEventSender.emitTokenButtonHTML();

  });

  // @ts-ignore
  document.getElementsByClassName('modal')[0].style.cssText = `opacity: 1; top: -320px; left: -278px;`;

  let tag = document.createElement("div");
  tag.innerHTML = negotiatorService.createFabButton(`${document.location.href}/theme/fab-button.svg`);
  document.getElementsByClassName('tk-modal')[0].appendChild(tag);
  // @ts-ignore
  window.negotiator = { modalClickHandler: () => { console.info('toggle simulation is not available in development mode.') } };
}

