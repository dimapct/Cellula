var Game = (function () {
    function Game() {
        var _this = this;
        this.update = function () {
            var fps = createjs.Ticker.getMeasuredFPS().toPrecision(4);
            var now = createjs.Ticker.getTime();
            var deltaTime = (now - _this.lastUpdateTime) / 1000;
            _this.lastUpdateTime = now;
            var clientInput = _this.controlsManager.reportInputs();
            _this.mechanicEngine.update(deltaTime, clientInput);
            _this.graphicsEngine.render(_this.mechanicEngine.gameObjects, fps);
        };
        this.mechanicEngine = new MechanicEngine();
        var gameCanvas = document.getElementById("gameCanvas");
        var cellMenuCanvas = document.getElementById("cellMenuCanvas");
        this.graphicsEngine = new GraphicsEngine(gameCanvas, cellMenuCanvas, this.mechanicEngine.player);
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