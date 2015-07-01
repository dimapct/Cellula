/// <reference path="lib\easeljs.d.ts" />

class GraphicsEngine {
    stage: createjs.Stage;
    menu: Menu;
    fpsPoint: Point;
    currentZoom = 1;
    rulerOn = false;

    constructor() {
        var canvas: any = document.createElement("canvas");
        canvas.style = "border:40px inset blue;"
        canvas.width = 1300;
        canvas.height = 600;
        document.body.appendChild(canvas);
        this.stage = new createjs.Stage(canvas);
        this.menu = new Menu();
        this.menu.createRuler(canvas);
        this.fpsPoint = new Point(canvas.width - 60, canvas.height - 20);
    }

    render(objects, fps) {
        console.log("render start");
        this.updateCanvasPosition(objects);
        this.syncStage(objects);
        //this.menu.update(fps, this.fpsPoint);
        this.stage.update();
        console.log(this.stage.children);
        console.log("render end");
    }

    updateCanvasPosition (objects) {
        objects.forEach(function (object) {
            object.image.x = object.gameRect.centerx;
            object.image.y = object.gameRect.centery;
        });
    }

    syncStage (objects) {
        this.stage.removeAllChildren();
        objects.forEach(function (obj) {
            this.stage.addChild(obj.image);
        });
        this.stage.addChild(this.menu.fpsText);
        if (this.rulerOn) {
            this.stage.addChild(this.menu.ruler)
        }
    }

} 