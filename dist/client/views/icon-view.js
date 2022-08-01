var IconView = (function () {
    function IconView(viewContainer, params) {
        this.params = {};
        this.viewContainer = viewContainer;
        this.params = params;
    }
    IconView.prototype.render = function () {
        var _this = this;
        var src = this.params.src;
        var image;
        if (src && src !== "undefined") {
            image = document.createElement('img');
            image.loading = "lazy";
            image.addEventListener('load', function (e) {
                _this.onLoad(e);
            });
            image.addEventListener('error', function (e) {
                _this.onError(e);
            });
            image.src = src;
        }
        else {
            image = this.createAvatar();
            this.viewContainer.classList.remove('shimmer-tn');
        }
        this.viewContainer.appendChild(image);
    };
    IconView.prototype.onLoad = function (_e) {
        this.viewContainer.classList.remove('shimmer-tn');
    };
    IconView.prototype.onError = function (_e) {
        this.viewContainer.innerHTML = "";
        this.viewContainer.appendChild(this.createAvatar());
        this.viewContainer.classList.remove('shimmer-tn');
    };
    IconView.prototype.createAvatar = function () {
        var image = document.createElement('img');
        image.src = this.generateAvatar(this.params.title);
        return image;
    };
    IconView.prototype.generateAvatar = function (text) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = 200;
        canvas.height = 200;
        if (!context)
            return "";
        context.fillStyle = this.getRandomBackgroundColor();
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "bold 100px 'Arial', sans-serif";
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        var words = text.split(" ");
        var initials = "";
        for (var i = 0; initials.length < 2 && i < words.length; i++) {
            var chars = words[i].split('');
            if (chars.length)
                initials += chars[0].toUpperCase();
        }
        context.fillText(initials, canvas.width / 2, canvas.height / 2);
        return canvas.toDataURL("image/png");
    };
    IconView.prototype.getRandomBackgroundColor = function () {
        return "#0029a7";
    };
    return IconView;
}());
export { IconView };
//# sourceMappingURL=icon-view.js.map