var MechanicEngine = (function () {
    function MechanicEngine() {
        this.gameObjectFactory = new GameObjectFactory();
        this.gameObjects = [];
    }
    MechanicEngine.prototype.createStartCells = function () {
        var cell1 = this.gameObjectFactory.createGameObject(CellTypes.POISON, new poisonData());
        var cell2 = this.gameObjectFactory.createGameObject(CellTypes.BASE, new baseData());
        var cell3 = this.gameObjectFactory.createGameObject(CellTypes.ENERGY, new energyData());
        this.gameObjects.push(cell1);
        this.gameObjects.push(cell2);
        this.gameObjects.push(cell3);
    };
    MechanicEngine.prototype.createStartFood = function () {
        var food1 = this.gameObjectFactory.createGameObject(FoodTypes.GLUCOSE, new glucoseData());
        this.gameObjects.push(food1);
    };
    MechanicEngine.prototype.update = function (t) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t);
        });
    };
    return MechanicEngine;
})();
//# sourceMappingURL=mechanic-engine.js.map