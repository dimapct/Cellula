class ControlsManager {
    gameStage: createjs.Stage;
    cellMenuStage: createjs.Stage;
    inputsContainer: InputsContainer;

    constructor(gameStage: createjs.Stage, cellMenuStage: createjs.Stage) {
        this.gameStage = gameStage;
        this.cellMenuStage = cellMenuStage;
        this.inputsContainer = new InputsContainer();
        this.setInputHandlers();
    }

    setInputHandlers() {
        var self = this;
        document.oncontextmenu = function () { return false };
        self.gameStage.addEventListener("stagemousedown", function (e: createjs.MouseEvent) {
            if (e.nativeEvent.button === 2) {
                self.inputsContainer.latestRightMouseClick = new Point(e.stageX, e.stageY);
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

        self.cellMenuStage.addEventListener("stagemousedown", function (e: createjs.MouseEvent) {
            if (e.nativeEvent.button === 0) {
                var lineContainer = self.cellMenuStage.getObjectUnderPoint(e.stageX, e.stageY, 0);
                self.inputsContainer.menuSelection = lineContainer.name;
            }
            return false;
        }); 



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
        report.menuSelection = storage.menuSelection;
        storage.nullify();
        return report;
    }

}


class InputsContainer {
    latestRightMouseClick: Point;
    leftRotationDuration: number = 0;
    rightRotationDuration: number = 0;
    leftKeyDown: number = 0;
    lastLeftKeyEvent = "keyUp";
    rightKeyDown: number = 0;
    lastRightKeyEvent = "keyUp";
    menuSelection = "";
    spaceDownAddCell: boolean = false;

    nullify () {
        this.leftRotationDuration = 0;
        this.rightRotationDuration = 0;
        this.spaceDownAddCell = false;
        this.menuSelection = "";
    }
}

class ReportContainer {
    latestRightMouseClick: Point;
    leftRotationDuration = 0;
    rightRotationDuration = 0;
    spaceDownAddCell = false;
    menuSelection = "";
}