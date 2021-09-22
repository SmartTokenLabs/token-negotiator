export const applyDevelopmentMode = (negotiatorService) => {
  const dataEvtMock = { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } };
    document.querySelector('.tk-modal').innerHTML = negotiatorService.createModalMarkup();
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
      negotiatorService.addTokens(resultTokens.tokens);
      negotiatorService.modalEventSender.emitTokenButtonHTML();
    });
    // @ts-ignore
    document.getElementsByClassName('modal')[0].style.cssText = `opacity: 1; top: -320px; left: -278px;`;
    let tag = document.createElement("div");
    tag.innerHTML = negotiatorService.createFabButton(`${document.location.href}/theme/fab-button.svg`);
    document.getElementsByClassName('tk-modal')[0].appendChild(tag);
    // @ts-ignore
    window.negotiator = { modalClickHandler: () => { console.info('toggle simulation is not available in development mode.') } };
}