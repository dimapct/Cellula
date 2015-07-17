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
            console.log(e.keyCode);
            return false;
        };
        window.onkeyup = function (e) {
            return false;
        };
    };
    ControlsManager.prototype.reportInputs = function () {
        return this.inputsContainer.latestRightMouseClick;
    };
    return ControlsManager;
})();
var InputsContainer = (function () {
    function InputsContainer() {
    }
    return InputsContainer;
})();
//# sourceMappingURL=controls-manager.js.map