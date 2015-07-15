/// <reference path="lib\easeljs.d.ts" />

class GraphicsEngine {
    stage: createjs.Stage;
    menu: Menu;
    fpsPoint: Point;
    currentZoom = 1;
    rulerOn = false;
    player: PlayerBeing;
    s1: any;
    s2: any;

    constructor(canvas, player) {
        this.setPlayer(player, canvas);
        this.stage = new createjs.Stage(canvas);
        this.s1 = new createjs.Shape();
        this.s1.graphics.beginFill("black").drawRect(0, canvas.height / 2, canvas.width, 1);
        this.s2 = new createjs.Shape();
        this.s2.graphics.beginFill("black").drawRect(canvas.width / 2, 0, 1, canvas.height);
        this.menu = new Menu();
        this.menu.createRuler(canvas);
        this.fpsPoint = new Point(canvas.width - 60, canvas.height - 20);
    }

    render(objects, fps) {
        this.updateCanvasPosition(objects);
        this.syncStage(objects);
        this.menu.update(fps, this.fpsPoint);
        
        this.stage.update();
    }

    setPlayer(player, canvas) {
        this.player = player;
        //this.player.image.x = canvas.width / 2;
        //this.player.image.y = canvas.height / 2;
    }

    updateCanvasPosition(objects) {
        var self = this;
        objects.forEach(function (object) {
            object.image.x = object.gameRect.center.x;
            object.image.y = object.gameRect.center.y;


            //if (object.gameType !== 'yy') {
                 
            //    var dx = self.player.gameRect.center.x - object.gameRect.center.x;
            //    var dy = self.player.gameRect.center.y - object.gameRect.center.y;

            //    object.image.x = self.player.image.x - dx;

            //    object.image.y = self.player.image.y - dy;
            //}
        });
    }

    syncStage(objects) {
        var stage = this.stage;
        stage.removeAllChildren();
        objects.forEach(function (obj) {
            stage.addChild(obj.image);
        });
        stage.addChild(this.menu.fpsText);
        stage.addChild(this.s1, this.s2);
        if (this.rulerOn) {
            stage.addChild(this.menu.ruler)
        }
    }

} 