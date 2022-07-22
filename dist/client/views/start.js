var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AbstractView } from "./view-interface";
import { SelectWallet } from "./select-wallet";
var Start = (function (_super) {
    __extends(Start, _super);
    function Start() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Start.prototype.render = function () {
        this.viewContainer.innerHTML = "\n            <div class=\"opening-content-view-tn\">\n              <div class=\"brand-tn\"></div>\n              <div class=\"inner-content-tn\">\n                <div class=\"inner-content-block-tn\">\n                  <button class=\"opening-btn-tn\">Let's go!</button>\n                  <div class=\"opening-heading-tn\">".concat(this.params.options.openingHeading, "</div>\n                </div>\n              </div>\n            </div>\n        ");
        this.viewContainer.querySelector('.opening-btn-tn').addEventListener('click', this.goToWalletSelection.bind(this));
    };
    Start.prototype.goToWalletSelection = function () {
        this.popup.updatePopup(SelectWallet);
    };
    return Start;
}(AbstractView));
export { Start };
//# sourceMappingURL=start.js.map