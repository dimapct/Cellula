class ControlsManager {
    gameStage: createjs.Stage;
    cellMenuStage: createjs.Stage;
    inputsContainer: InputsContainer;
    gameStageLeftMouseClickHandlers: { (x: number, y: number) }[];
    cellMenuStageClickHandlers: { (x: number, y: number) }[];
    spaceButtonHandlers: {()}[];

    constructor(gameStage: createjs.Stage, cellMenuStage: createjs.Stage) {
        this.gameStage = gameStage;
        this.cellMenuStage = cellMenuStage;
        this.inputsContainer = new InputsContainer();
        this.gameStageLeftMouseClickHandlers = [];
        this.cellMenuStageClickHandlers = [];
        this.spaceButtonHandlers = [];
        this.setInputHandlers();
    }

    setInputHandlers() {
        var self = this;
        document.oncontextmenu = function () { return false };
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
                case 17:  // left cntrl
                    if (!storage.spaceDownAddCell) {
                        storage.spaceDownAddCell = true;
                    }
                    break;
                case 32: // space
                    self.spaceButtonHandlers.forEach((v) => { v(); });
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
        self.gameStage.addEventListener("stagemousedown", function (e: createjs.MouseEvent) {
            if (e.nativeEvent.button === 2) {
                self.inputsContainer.latestRightMouseClick = new Point(e.stageX, e.stageY);
            }
            else if (e.nativeEvent.button === 0) {
                self.gameStageLeftMouseClickHandlers.forEach(function (item) { item(e.stageX, e.stageY) });
            }
            return false;
        }); 
        self.cellMenuStage.addEventListener("stagemousedown", function (e: createjs.MouseEvent) {
            if (e.nativeEvent.button === 0) {
                self.cellMenuStageClickHandlers.forEach(function (handler) { handler(e.stageX, e.stageY); });
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
        report.latestLeftMouseClick = storage.latestLeftMouseClick;
        report.leftRotationDuration = storage.leftRotationDuration;
        report.rightRotationDuration = storage.rightRotationDuration;
        report.spaceDownAddCell = storage.spaceDownAddCell;
        storage.nullify();
        return report;
    }
}


class InputsContainer {
    latestRightMouseClick: Point;
    latestLeftMouseClick: Point;
    leftRotationDuration: number = 0;
    rightRotationDuration: number = 0;
    leftKeyDown: number = 0;
    lastLeftKeyEvent = "keyUp";
    rightKeyDown: number = 0;
    lastRightKeyEvent = "keyUp";
    spaceDownAddCell = false;

    nullify () {
        this.leftRotationDuration = 0;
        this.rightRotationDuration = 0;
        this.spaceDownAddCell = false;
    }
}

class ReportContainer {
    latestRightMouseClick: Point;
    latestLeftMouseClick: Point;
    leftRotationDuration = 0;
    rightRotationDuration = 0;
    spaceDownAddCell = false;
}