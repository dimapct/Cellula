class Game {
    mechanicEngine: MechanicEngine;
    graphicsEngine: GraphicsEngine;
    lastUpdateTime: number;

    constructor() {
        this.mechanicEngine = new MechanicEngine();
        console.log(100);
        console.log(this.mechanicEngine);
        this.graphicsEngine = new GraphicsEngine();
        this.lastUpdateTime = 0;
    }

    run() {
        console.log("Game run start");
        this.mechanicEngine.createStartCells();
        createjs.Ticker.interval = 16;
        createjs.Ticker.addEventListener("tick", this.update);
        //setInterval(function () { this.update(); }, 33)
        console.log("Game run end");
    }

    puk() {
        console.log("PUUUUK");
    }

    update() {
        console.log("Update start...");
        this.puk();
        //var fps = createjs.Ticker.getMeasuredFPS().toPrecision(4);
        //var now = createjs.Ticker.getTime();
        //var deltaTime = (now - this.lastUpdateTime) / 1000;
        //this.lastUpdateTime = now;
        console.log(this.graphicsEngine);
        console.log(this.mechanicEngine);
        this.mechanicEngine.update(1);
        this.graphicsEngine.render(this.mechanicEngine.cells, 12);
        console.log("Update end.")
    }
} 