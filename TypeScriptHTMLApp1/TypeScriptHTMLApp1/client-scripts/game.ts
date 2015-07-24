class Game {
    mechanicEngine: MechanicEngine;
    graphicsEngine: GraphicsEngine;
    controlsManager: ControlsManager;
    lastUpdateTime: number;

    constructor() {
        this.mechanicEngine = new MechanicEngine();
        var gameCanvas = document.getElementById("gameCanvas");
        var cellMenuCanvas = document.getElementById("cellMenuCanvas");
        this.graphicsEngine = new GraphicsEngine(gameCanvas, cellMenuCanvas, this.mechanicEngine.player);
        this.controlsManager = new ControlsManager();
        this.lastUpdateTime = 0;
    }

    run() {
        console.log("Start game run")
        this.mechanicEngine.createStartObjects();
        createjs.Ticker.interval = 16;
        createjs.Ticker.addEventListener("tick", this.update);
    }

    update = () => {
        var fps = createjs.Ticker.getMeasuredFPS().toPrecision(4);
        var now = createjs.Ticker.getTime();
        var deltaTime = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        var clientInput = this.controlsManager.reportInputs();
        this.mechanicEngine.update(deltaTime, clientInput);
        this.graphicsEngine.render(this.mechanicEngine.gameObjects, fps);
    }
} 