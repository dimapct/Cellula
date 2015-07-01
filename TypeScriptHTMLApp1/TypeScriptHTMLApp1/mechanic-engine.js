var MechanicEngine = (function () {
    function MechanicEngine() {
        this.gameObjectFactory = new GameObjectFactory();
        this.cells = [];
    }
    MechanicEngine.prototype.createStartCells = function () {
        console.log("Start creating cells...");
        var cell1 = this.gameObjectFactory.createGameObject(CellTypes.POISON, new poisonData());
        var cell2 = this.gameObjectFactory.createGameObject(CellTypes.BASE, new baseData());
        var cell3 = this.gameObjectFactory.createGameObject(CellTypes.ENERGY, new energyData());
        this.cells.push(cell1);
        this.cells.push(cell2);
        this.cells.push(cell3);
        console.log("Start cells created!");
    };
    MechanicEngine.prototype.update = function (t) {
        console.log("ME update start");
        this.cells.forEach(function (cell) {
            cell.update(1);
        });
        console.log("ME update end");
    };
    return MechanicEngine;
})();
//# sourceMappingURL=mechanic-engine.js.map