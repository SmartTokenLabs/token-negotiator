export var createOverlayMarkup = function () {
    return "\n    <div class=\"overlay\">\n      <div class=\"brand\"></div>\n      <p class=\"headline\">Available Tokens</p>\n      <div class=\"token-container\">\n        <p style=\"padding: 0 16px; color: grey\">No tokens available.</p>\n      </div>\n    </div>\n  ";
};
export var createToken = function (data, index, tokenImage) {
    return "\n    <div class='token'>\n      <div class='content'>\n        <svg class='emblem' src=" + tokenImage + " />\n        <div class='data'>\n          <p class='title'>Devcon Ticket #" + index + "</p>\n          <p class='detail'>Discount for Hotels and VIP Section</p>\n        </div>\n      </div>\n      <div class='toggle'>\n        <input onClick='tokenToggleSelection()' data-index='" + index + "' data-token='" + JSON.stringify(data) + "' type='checkbox' name='toggle" + index + "' class='mobileToggle' id='toggle" + index + "'>\n        <label for='toggle" + index + "'></label>\n      </div>\n    </div>\n  ";
};
export var createFabButton = function (button) {
    return "<button class=\"overlay-fab-button-tn\" onclick=\"negotiator.overlayClickHandler()\" style=\"padding: 0; height:80px; width:80px; border: 0; box-shadow: 0 2px 5px 0 #676767; border-radius: 64px; cursor: pointer; z-index: 999; position: relative;\"><div style=\"pointer-events: none;\"><svg src=" + button + "></svg></div></button>";
};
//# sourceMappingURL=componentFactory.js.map