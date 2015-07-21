class ControlsManager {
    canvas: any;
    inputsContainer: InputsContainer;

    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.inputsContainer = new InputsContainer();
        this.setInputHandlers();
    }

    setInputHandlers() {
        var self = this;
        document.oncontextmenu = function () { return false };

        $(self.canvas).mousedown(function (e) {
            if (e.button === 2) {
                self.inputsContainer.latestRightMouseClick = new Point(e.pageX - self.canvas.offsetLeft, e.pageY - self.canvas.offsetTop);
                //console.log("Mouse pos: " + self.latestRightMouseClick.x + " " + self.latestRightMouseClick.y);
            }
            return false;
        }); 

        window.onkeydown = function (e) {
            var storage = self.inputsContainer;
            //console.log(e.keyCode);
            switch(e.keyCode) {
                case 65: // left
                    if (storage.lastLeftKeyEvent === "keyDown") {
                        var now = new Date().getTime();
                        storage.leftRotationDuration += now - storage.leftKeyDown;
                        storage.leftKeyDown = now;
                    }

                    else if (storage.lastLeftKeyEvent === "keyUp") {
                        storage.leftKeyDown = new Date().getTime();
                        storage.lastLeftKeyEvent = "keyDown";
                    }
                    break;

                case 68: // right
                    if (storage.lastRightKeyEvent === "keyDown") {
                        var now = new Date().getTime();
                        storage.rightRotationDuration += now - storage.rightKeyDown;
                        storage.rightKeyDown = now;
                    }

                    else if (storage.lastRightKeyEvent === "keyUp") {
                        storage.rightKeyDown = new Date().getTime();
                        storage.lastRightKeyEvent = "keyDown";
                    }
                    break;

                case 32: // space
                    if (!storage.spaceDownAddCell) {
                        storage.spaceDownAddCell = true;
                    }
                    break;
            }
            
            
            return false;
        }
        window.onkeyup = function (e) {
            var storage = self.inputsContainer;
             switch(e.keyCode) {
                case 65: // left
                    if (storage.lastLeftKeyEvent === "keyDown") {
                        var now = new Date().getTime();
                        storage.leftRotationDuration += now - storage.leftKeyDown;
                        storage.lastLeftKeyEvent = "keyUp";
                    }
                    break;

                case 68: // right
                    if (storage.lastRightKeyEvent === "keyDown") {
                        var now = new Date().getTime();
                        storage.rightRotationDuration += now - storage.rightKeyDown;
                        storage.lastRightKeyEvent = "keyUp";
                    }
                    break;
            }


            return false;
        }
    }

    reportInputs() {
        var storage = this.inputsContainer;
        if(storage.lastLeftKeyEvent === "keyDown") {
            var now = new Date().getTime();
            storage.leftRotationDuration += now - storage.leftKeyDown;
            storage.leftKeyDown = now;
        }
        if(storage.lastRightKeyEvent === "keyDown") {
            var now = new Date().getTime();
            storage.rightRotationDuration += now - storage.rightKeyDown;
            storage.rightKeyDown = now;
        }
        var report = new ReportContainer();
        report.latestRightMouseClick = storage.latestRightMouseClick;
        report.leftRotationDuration = storage.leftRotationDuration;
        report.rightRotationDuration = storage.rightRotationDuration;
        report.spaceDownAddCell = storage.spaceDownAddCell;
        storage.nullify();
        return report;
    }

}


class InputsContainer {
    latestRightMouseClick: Point;
    leftRotationDuration: number = 0;
    rightRotationDuration: number = 0;
    leftKeyDown: number = 0;
    //leftKeyUp: number = 0;
    lastLeftKeyEvent = "keyUp";
    rightKeyDown: number = 0;
    //rightKeyUp: number = 0;
    lastRightKeyEvent = "keyUp";

    spaceDownAddCell: boolean = false;

    nullify () {
        this.leftRotationDuration = 0;
        this.rightRotationDuration = 0;
        this.spaceDownAddCell = false;
    }
}

class ReportContainer {
    latestRightMouseClick: Point;
    leftRotationDuration: number = 0;
    rightRotationDuration: number = 0;
    spaceDownAddCell: boolean = false;
}