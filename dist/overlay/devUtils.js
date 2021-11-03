export var applyDevelopmentMode = function (tokenName, tokenSelectorContainer, tokensOrigin, localStorageItemName, negotiatorService) {
    if (tokenName === void 0) { tokenName = 'devcon-ticket'; }
    if (tokenSelectorContainer === void 0) { tokenSelectorContainer = ".tokenSelectorContainerElement"; }
    if (tokensOrigin === void 0) { tokensOrigin = "http://localhost:3002/"; }
    if (localStorageItemName === void 0) { localStorageItemName = "dcTokens"; }
    var dataEvtMock = { tokenName: tokenName, filter: {}, options: { tokenSelectorContainer: tokenSelectorContainer } };
    document.querySelector('.tk-overlay').innerHTML = negotiatorService.createOverlayMarkup();
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
    }).then(function (resultTokens) {
        negotiatorService.addTokens(resultTokens);
    });
    document.getElementsByClassName('overlay')[0].style.cssText = "opacity: 1; top: -320px; left: -278px;";
    var tag = document.createElement("div");
    tag.innerHTML = negotiatorService.createFabButton(negotiatorService.config.fabButton);
    document.getElementsByClassName('tk-overlay')[0].appendChild(tag);
    window.negotiator = { overlayClickHandler: function () { console.info('toggle simulation is not available in development mode.'); } };
};
//# sourceMappingURL=devUtils.js.map