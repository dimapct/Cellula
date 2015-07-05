var Game = (function () {
    function Game() {
        var _this = this;
        this.update = function () {
            var fps = createjs.Ticker.getMeasuredFPS().toPrecision(4);
            var now = createjs.Ticker.getTime();
            var deltaTime = (now - _this.lastUpdateTime) / 1000;
            _this.lastUpdateTime = now;
            _this.mechanicEngine.update(deltaTime);
            _this.graphicsEngine.render(_this.mechanicEngine.gameObjects, fps);
        };
        this.mechanicEngine = new MechanicEngine();
        this.graphicsEngine = new GraphicsEngine();
        this.lastUpdateTime = 0;
    }
    Game.prototype.run = function () {
        this.mechanicEngine.createStartCells();
        createjs.Ticker.interval = 16;
        createjs.Ticker.addEventListener("tick", this.update);
    };
    return Game;
})();
//# sourceMappingURL=game.js.map