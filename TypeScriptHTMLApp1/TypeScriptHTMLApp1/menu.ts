class Menu {
    fpsText: any;
    fpsTextSize = 10;
    fpsTextColor = "red";
    ruler = new createjs.Container();

    update(fps, point) {
        this.updateFPS(fps, point);
    }

    updateFPS(fps, point) {
        if (this.fpsText === undefined) {
            this.createFPSText(fps, point)
        }
        else {
            this.fpsText.text = "FPS: " + fps;
        }
    }
    createFPSText(fps, point) {
        this.fpsText = new createjs.Text("FPS: " + fps, this.fpsTextSize + "px Arial", this.fpsTextColor);
        this.fpsText.zIndex = 3;
        this.fpsText.x = point.x;
        this.fpsText.y = point.y;
    }
    createRuler(canvas) {
        var x = 0;
        var y = 0;
        var step = 10;
        while (x < canvas.width) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill("black").drawRect(0, 0, 1, canvas.height);
            shape.x = x;
            x += step;
            this.ruler.addChild(shape);
        }

        while (y < canvas.height) {
            var shape = new createjs.Shape();
            shape.graphics.beginFill("black").drawRect(0, 0, canvas.width, 1);
            shape.y = y;
            y += step;
            this.ruler.addChild(shape);
        }
    }
} 