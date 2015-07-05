var MechanicEngine = (function () {
    function MechanicEngine() {
        this.gameObjectFactory = new GameObjectFactory();
        this.gameObjects = [];
    }
    MechanicEngine.prototype.createStartObjects = function () {
        var cell1 = this.gameObjectFactory.createGameObject(GameObjectTypes.POISON, new poisonData());
        var cell2 = this.gameObjectFactory.createGameObject(GameObjectTypes.BASE, new baseData());
        var cell3 = this.gameObjectFactory.createGameObject(GameObjectTypes.ENERGY, new energyData());
        var food1 = this.gameObjectFactory.createGameObject(GameObjectTypes.GLUCOSE, new glucoseData());
        this.gameObjects.push(cell1);
        this.gameObjects.push(cell2);
        this.gameObjects.push(cell3);
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