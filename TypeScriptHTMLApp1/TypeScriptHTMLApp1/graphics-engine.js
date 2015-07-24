/// <reference path="lib\easeljs.d.ts" />
var GraphicsEngine = (function () {
    function GraphicsEngine(gameCanvas, cellMenuCanvas, player) {
        this.currentZoom = 1;
        this.rulerOn = false;
        this.cellMenuCanvasWidth = 200;
        this.setGameCanvasProps(gameCanvas);
        this.setCellMenuCanvasProps(cellMenuCanvas);
        this.setPlayer(player, this.gameCanvas);
        this.stage = new createjs.Stage(this.gameCanvas);
        this.menu = new Menu();
        this.menu.createRuler(this.gameCanvas);
        this.fpsPoint = new Point(this.gameCanvas.width - 60, this.gameCanvas.height - 20);
    }
    GraphicsEngine.prototype.setGameCanvasProps = function (gameCanvas) {
        this.gameCanvas = gameCanvas;
        this.gameCanvas.style = "border:1px solid blue;";
        this.gameCanvas.width = $(window).width() - this.cellMenuCanvasWidth;
        this.gameCanvas.height = $(window).height();
    };
    GraphicsEngine.prototype.setCellMenuCanvasProps = function (cellMenuCanvas) {
        this.cellMenuCanvas = cellMenuCanvas;
        this.cellMenuCanvas.style = "border:1px solid blue;";
        this.cellMenuCanvas.width = this.cellMenuCanvasWidth;
        this.cellMenuCanvas.height = $(window).height();
    };
    GraphicsEngine.prototype.render = function (objects, fps) {
        this.updateCanvasPosition(objects);
        this.syncStage(objects);
        this.menu.update(fps, this.fpsPoint);
        this.stage.update();
    };
    GraphicsEngine.prototype.setPlayer = function (player, canvas) {
        this.player = player;
    };
    GraphicsEngine.prototype.updateCanvasPosition = function (objects) {
        var self = this;
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