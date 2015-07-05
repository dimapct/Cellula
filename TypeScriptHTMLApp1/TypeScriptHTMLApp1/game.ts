class Game {
    mechanicEngine: MechanicEngine;
    graphicsEngine: GraphicsEngine;
    lastUpdateTime: number;

    constructor() {
        this.mechanicEngine = new MechanicEngine();
        this.graphicsEngine = new GraphicsEngine();
        this.lastUpdateTime = 0;
    }

    run() {
        this.mechanicEngine.createStartCells();
        createjs.Ticker.interval = 16;
        createjs.Ticker.addEventListener("tick", this.update);
    }

    update = () => {
        var fps = createjs.Ticker.getMeasuredFPS().toPrecision(4);
        var now = createjs.Ticker.getTime();
        var deltaTime = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;
        this.mechanicEngine.update(deltaTime);
        this.graphicsEngine.render(this.mechanicEngine.gameObjects, fps);
    }
} 