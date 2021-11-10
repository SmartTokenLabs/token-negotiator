// This creates a mock token and provides a mock overlay/modal
export const applyDevelopmentMode = (
  negotiatorService: any,
  tokenName = 'devcon-ticket',
  tokenSelectorContainer = ".tokenSelectorContainerElement",
  tokensOrigin = "http://localhost:3002/",
  localStorageItemName = "dcTokens",
  ) => {
  const dataEvtMock = { tokenName: tokenName, filter: {}, options: { tokenSelectorContainer: tokenSelectorContainer } };
    const overlayElRef:any = document.querySelector('.tk-overlay');
    if (overlayElRef) overlayElRef.innerHTML = negotiatorService.createOverlayMarkup();
    negotiatorService.configuration = {
      filter: dataEvtMock.filter,
      tokenName: dataEvtMock.tokenName,
      options: dataEvtMock.options
    };
    negotiatorService.getTokens({
      filter: {},
      tokenName: tokenName,
      tokensOrigin: tokensOrigin,
      localStorageItemName: localStorageItemName,
      tokenParser: negotiatorService.config.tokenParser,
      unsignedTokenDataName: negotiatorService.config.unsignedTokenDataName
    }).then((resultTokens: any) => {
      negotiatorService.addTokens(resultTokens);
    });
    const overlayEl = document.getElementsByClassName('overlay')[0];
    // @ts-ignore
    if (overlayEl) overlayEl.style.cssText = `opacity: 1; top: -320px; left: -278px;`;
    let tag = document.createElement("div");
    tag.innerHTML = negotiatorService.createFabButton(negotiatorService.config.fabButton);
    document.getElementsByClassName('tk-overlay')[0].appendChild(tag);
    // @ts-ignore
    window.negotiator = { overlayClickHandler: () => { console.info('toggle simulation is not available in development mode.') } };
}