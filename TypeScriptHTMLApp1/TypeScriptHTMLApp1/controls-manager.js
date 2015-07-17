var ControlsManager = (function () {
    function ControlsManager() {
        this.canvas = document.getElementById("gameCanvas");
        this.inputsContainer = new InputsContainer();
        this.setInputHandlers();
    }
    ControlsManager.prototype.setInputHandlers = function () {
        var self = this;
        document.oncontextmenu = function () { return false; };
        $(self.canvas).mousedown(function (e) {
            if (e.button === 2) {
                self.inputsContainer.latestRightMouseClick = new Point(e.pageX - self.canvas.offsetLeft, e.pageY - self.canvas.offsetTop);
            }
            return false;
        });
        window.onkeydown = function (e) {
            var storage = self.inputsContainer;
            switch (e.keyCode) {
                case 65:
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
                case 68:
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
            }
            return false;
        };
        window.onkeyup = function (e) {
            var storage = self.inputsContainer;
            switch (e.keyCode) {
                case 65:
                    if (storage.lastLeftKeyEvent === "keyDown") {
                        var now = new Date().getTime();
                        storage.leftRotationDuration += now - storage.leftKeyDown;
                        storage.lastLeftKeyEvent = "keyUp";
                    }
                    break;
                case 68:
                    if (storage.lastRightKeyEvent === "keyDown") {
                        var now = new Date().getTime();
                        storage.rightRotationDuration += now - storage.rightKeyDown;
                        storage.lastRightKeyEvent = "keyUp";
                    }
                    break;
            }
            return false;
        };
    };
    ControlsManager.prototype.reportInputs = function () {
        var storage = this.inputsContainer;
        if (storage.lastLeftKeyEvent === "keyDown") {
            var now = new Date().getTime();
            storage.leftRotationDuration += now - storage.leftKeyDown;
            storage.leftKeyDown = now;
        }
        if (storage.lastRightKeyEvent === "keyDown") {
            var now = new Date().getTime();
            storage.rightRotationDuration += now - storage.rightKeyDown;
            storage.rightKeyDown = now;
        }
        var report = new ReportContainer();
        report.latestRightMouseClick = storage.latestRightMouseClick;
        report.leftRotationDuration = storage.leftRotationDuration;
        report.rightRotationDuration = storage.rightRotationDuration;
        storage.nullifyRotationDuration();
        return report;
    };
    return ControlsManager;
})();
var InputsContainer = (function () {
    function InputsContainer() {
        this.leftRotationDuration = 0;
        this.rightRotationDuration = 0;
        this.leftKeyDown = 0;
        //leftKeyUp: number = 0;
        this.lastLeftKeyEvent = "keyUp";
        this.rightKeyDown = 0;
        //rightKeyUp: number = 0;
        this.lastRightKeyEvent = "keyUp";
    }
    InputsContainer.prototype.nullifyRotationDuration = function () {
        this.leftRotationDuration = 0;
        this.rightRotationDuration = 0;
    };
    return InputsContainer;
})();
var ReportContainer = (function () {
    function ReportContainer() {
        this.leftRotationDuration = 0;
        this.rightRotationDuration = 0;
    }
    return ReportContainer;
})();
//# sourceMappingURL=controls-manager.js.map