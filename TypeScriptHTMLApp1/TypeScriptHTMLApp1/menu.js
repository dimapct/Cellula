var Menu = (function () {
    function Menu() {
        this.fpsTextSize = 10;
        this.fpsTextColor = "red";
        this.ruler = new createjs.Container();
    }
    Menu.prototype.update = function (fps, point) {
        this.updateFPS(fps, point);
    };
    Menu.prototype.updateFPS = function (fps, point) {
        if (this.fpsText === undefined) {
            this.createFPSText(fps, point);
        }
        else {
            this.fpsText.text = "FPS: " + fps;
        }
    };
    Menu.prototype.createFPSText = function (fps, point) {
        this.fpsText = new createjs.Text("FPS: " + fps, this.fpsTextSize + "px Arial", this.fpsTextColor);
        this.fpsText.zIndex = 3;
        this.fpsText.x = point.x;
        this.fpsText.y = point.y;
    };
    Menu.prototype.createRuler = function (canvas) {
        var x = 0;
        var y = 0;
        var step = 10;
        while (x < canvas.width) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill("black").drawRect(0, 0, 1, canvas.height);
            shape.x = x;
            x += step;
            this.ruler.addChild(shape);
        }
        while (y < canvas.height) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill("black").drawRect(0, 0, canvas.width, 1);
            shape.y = y;
            y += step;
            this.ruler.addChild(shape);
        }
    };
    return Menu;
})();
//# sourceMappingURL=menu.js.map