class Game {
    mechanicEngine: MechanicEngine;
    graphicsEngine: GraphicsEngine;
    controlsManager: ControlsManager;
    lastUpdateTime: number;

    constructor() {
        this.mechanicEngine = new MechanicEngine();
        var canvas: any = document.getElementById("gameCanvas");
        //canvas.style = "border:40px inset blue;"
        canvas.width = $(window).width() - 200;
        canvas.height = $(window).height() - 200;
        this.graphicsEngine = new GraphicsEngine(canvas, this.mechanicEngine.player);
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

        var clientInput = this.controlsManager.latestRightMouseClick;
        this.mechanicEngine.update(deltaTime, clientInput);
        this.graphicsEngine.render(this.mechanicEngine.gameObjects, fps);
    }
} 