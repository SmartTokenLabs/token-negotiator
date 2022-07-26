var AbstractView = (function () {
    function AbstractView(client, popup, viewContainer, params) {
        this.params = {};
        this.client = client;
        this.ui = popup;
        this.viewContainer = viewContainer;
        this.params = params;
        this.init();
    }
    AbstractView.prototype.init = function () { };
    AbstractView.prototype.update = function (params) {
        this.params = params;
        this.render();
    };
    return AbstractView;
}());
export { AbstractView };
//# sourceMappingURL=view-interface.js.map