/// <reference path="lib\easeljs.d.ts" />
var GraphicsEngine = (function () {
    function GraphicsEngine() {
        this.currentZoom = 1;
        this.rulerOn = false;
        var canvas = document.createElement("canvas");
        canvas.style = "border:40px inset blue;";
        canvas.width = 1300;
        canvas.height = 600;
        document.body.appendChild(canvas);
        this.stage = new createjs.Stage(canvas);
        this.menu = new Menu();
        this.menu.createRuler(canvas);
        this.fpsPoint = new Point(canvas.width - 60, canvas.height - 20);
    }
    GraphicsEngine.prototype.render = function (objects, fps) {
        this.updateCanvasPosition(objects);
        this.syncStage(objects);
        this.menu.update(fps, this.fpsPoint);
        this.stage.update();
    };
    GraphicsEngine.prototype.updateCanvasPosition = function (objects) {
        objects.forEach(function (object) {
            object.image.x = object.gameRect.center.x;
            object.image.y = object.gameRect.center.y;
        });
    };
    GraphicsEngine.prototype.syncStage = function (objects) {
        var stage = this.stage;
        stage.removeAllChildren();
        objects.forEach(function (obj) {
            stage.addChild(obj.image);
        });
        stage.addChild(this.menu.fpsText);
        if (this.rulerOn) {
            stage.addChild(this.menu.ruler);
        }
    };
    return GraphicsEngine;
})();
//# sourceMappingURL=graphics-engine.js.map