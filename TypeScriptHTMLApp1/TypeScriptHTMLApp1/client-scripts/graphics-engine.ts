/// <reference path="..\lib\easeljs.d.ts" />

class GraphicsEngine {
    stage: createjs.Stage;
    menu: Menu;
    cellMenu: CellMenu;
    fpsPoint: Point;
    currentZoom = 1;
    player: PlayerBeing;
    gameCanvas: any;
    cellMenuCanvas: any;
    cellMenuCanvasWidth: number = 200;

    constructor(gameCanvas, cellMenuCanvas, player, cellFactory: CellFactory) {
        this.setGameCanvasProps(gameCanvas);
        this.setCellMenuCanvasProps(cellMenuCanvas);
        this.setPlayer(player, this.gameCanvas);
        this.stage = new createjs.Stage(this.gameCanvas);
        this.menu = new Menu();
        this.cellMenu = new CellMenu(this.cellMenuCanvas, cellFactory);
        this.fpsPoint = new Point(this.gameCanvas.width - 60, this.gameCanvas.height - 60);
    }

    init(controlsManager: ControlsManager) {
        this.cellMenu.init(controlsManager);
    }

    setGameCanvasProps(gameCanvas) {
        this.gameCanvas = gameCanvas;
        this.gameCanvas.style = "border:1px solid blue;"
        this.gameCanvas.width = $(window).width() - this.cellMenuCanvasWidth;
        this.gameCanvas.height = $(window).height();
    }

    setCellMenuCanvasProps(cellMenuCanvas) {
        this.cellMenuCanvas = cellMenuCanvas;
        this.cellMenuCanvas.style = "border:1px solid blue;"
        this.cellMenuCanvas.width = this.cellMenuCanvasWidth;
        this.cellMenuCanvas.height = $(window).height();
        this.cellMenuCanvas.style.position = "absolute";
        this.cellMenuCanvas.style.left = $(window).width() - this.cellMenuCanvasWidth;
    }

    subscribeToEvents(mechanicEngine: MechanicEngine) {
        this.cellMenu.onCellAddStart.add(this.cellAddStartHandler);
        mechanicEngine.onCellAddEnd.add(this.cellAddEndHandler);
    }

    cellAddStartHandler = (cell: BaseCell) => {
        this.stage.addChild(cell.image);
        this.stage.addEventListener("mouseleave", this.cellMenu.stageLeaveHandler);
        this.stage.addEventListener("mouseenter", this.cellMenu.stageEnterHandler);
    }

    cellAddEndHandler = (cell: BaseCell) => {
        this.stage.removeEventListener("mouseleave", this.cellMenu.stageLeaveHandler);
        this.stage.removeEventListener("mouseenter", this.cellMenu.stageEnterHandler);
        cell.image.visible = false;
        this.stage.removeChild(cell.image);
    }



    update(objects, fps) {
        this.updateCanvasPosition(objects);
        this.syncStage(objects);
        this.menu.update(fps, this.fpsPoint);

        if (this.stage.mouseInBounds) {
            var x = this.stage.mouseX;
            var y = this.stage.mouseY;
        }
        else {
            var x = -1000;
            var y = -1000;
        }

        this.cellMenu.update(new Point(x, y), this.player.image.rotation);
    }

    render(objects, fps) {
        this.update(objects, fps);
        this.stage.update();
        this.cellMenu.stage.update();
    }

    setPlayer(player, canvas) {
        this.player = player;
    }

    updateCanvasPosition(objects) {
        var self = this;
        objects.forEach(function (object) {
            object.image.x = object.gameRect.center.x;
            object.image.y = object.gameRect.center.y;
        });
    }

    syncStage(objects) {
        var stage = this.stage;
        //stage.removeAllChildren();
        objects.forEach(function (obj) {
            stage.addChild(obj.image);
        });
        stage.addChild(this.menu.fpsText);
    }

} 