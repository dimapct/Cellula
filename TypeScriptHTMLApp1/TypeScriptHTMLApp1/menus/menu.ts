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
} 