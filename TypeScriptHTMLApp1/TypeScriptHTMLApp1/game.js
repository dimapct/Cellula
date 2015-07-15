var Game = (function () {
    function Game() {
        var _this = this;
        this.update = function () {
            var fps = createjs.Ticker.getMeasuredFPS().toPrecision(4);
            var now = createjs.Ticker.getTime();
            var deltaTime = (now - _this.lastUpdateTime) / 1000;
            _this.lastUpdateTime = now;
            var clientInput = _this.controlsManager.latestRightMouseClick;
            _this.mechanicEngine.update(deltaTime, clientInput);
            _this.graphicsEngine.render(_this.mechanicEngine.gameObjects, fps);
        };
        this.mechanicEngine = new MechanicEngine();
        var canvas = document.getElementById("gameCanvas");
        //canvas.style = "border:40px inset blue;"
        canvas.width = $(window).width() - 200;
        canvas.height = $(window).height() - 200;
        this.graphicsEngine = new GraphicsEngine(canvas, this.mechanicEngine.player);
        this.controlsManager = new ControlsManager();
        this.lastUpdateTime = 0;
    }
    Game.prototype.run = function () {
        console.log("Start game run");
        this.mechanicEngine.createStartObjects();
        createjs.Ticker.interval = 16;
        createjs.Ticker.addEventListener("tick", this.update);
    };
    return Game;
})();
//# sourceMappingURL=game.js.map