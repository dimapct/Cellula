var MechanicEngine = (function () {
    function MechanicEngine() {
        this.cellFactory = new CellFactory();
        this.gameObjects = [];
    }
    MechanicEngine.prototype.createStartObjects = function () {
        var cell1 = this.cellFactory.createCell(CellTypes.MUSCLE, new muscleData());
        var bData = new beingData();
        bData.cells.push(cell1);
        var being = new Being(bData);
        this.gameObjects.push(being);
    };
    MechanicEngine.prototype.update = function (t) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t);
        });
    };
    return MechanicEngine;
})();
//# sourceMappingURL=mechanic-engine.js.map