export var createOverlayMarkup = function (heading) {
    if (heading === void 0) { heading = "Available Tokens"; }
    return "\n    <div class=\"overlay-content-tn\">\n      <div class=\"brand-tn\"></div>\n      <p class=\"headline-tn\">" + heading + "</p>\n      <div class=\"token-container-tn\">\n        <p class=\"no-tokens-tn\">No tokens available.</p>\n      </div>\n    </div>\n  ";
};
export var createToken = function (config) {
    var tokenIssuerKey = config.tokenIssuerKey, title = config.title, data = config.data, index = config.index, emblem = config.emblem;
    return "\n    <div class='token-tn'>\n      <img class='emblem-tn' src=" + emblem + " />\n      <div class='data-tn'>\n          <p class='title-tn'>" + title + "</p>\n          <p class='detail-tn'>#" + index + "</p>\n        </div>\n      <div class='toggle-tn'>\n        <input data-key='" + tokenIssuerKey + "' data-token='" + JSON.stringify(data) + "' onClick='tokenToggleSelection(event)' data-index='" + index + "' type='checkbox' name='toggle" + index + "' class='mobileToggle-tn toggle-tn' id='toggle" + index + "'>\n        <label for='toggle" + index + "'></label>\n      </div>\n    </div>\n  ";
};
export var createFabButton = function () {
    return "\n    <button class=\"overlay-fab-button-tn\" onclick=\"window.negotiator.overlayClickHandler()\">      \n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"55\" height=\"55\" viewBox=\"0 0 55 55\"><path fill=\"white\" id=\"svg-tn-left\" d=\"M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z\" transform=\"translate(13,28.5) translate(0,0) translate(-13,-13.5)\"/><path id=\"svg-tn-right\" fill=\"white\" d=\"M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z\" transform=\"translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)\"/></svg>\n    </button>\n";
};
//# sourceMappingURL=componentFactory.js.map