var MechanicEngine = (function () {
    function MechanicEngine() {
        this.beingFactory = new BeingFactory();
        this.gameObjectFactory = new GameObjectFactory();
        this.gameObjects = [];
        this.player = this.beingFactory.createBeing(BeingTypes.PLAYER, new playerData());
        var npc = this.beingFactory.createBeing(BeingTypes.NPC, new npcData());
        var food = this.gameObjectFactory.createGameObject(GameObjectTypes.FOOD, new foodData());
        this.gameObjects.push(npc);
        this.gameObjects.push(food);
    }
    MechanicEngine.prototype.createStartObjects = function () {
        this.gameObjects.push(this.player);
    };
    MechanicEngine.prototype.update = function (t, clientInputData) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t, clientInputData);
        });
        var goPoint = clientInputData.latestRightMouseClick;
        if (goPoint &&
            (goPoint.x !== this.player.moveTarget.x || goPoint.y !== this.player.moveTarget.y) &&
            (goPoint.x !== this.player.lastMoveTarget.x || goPoint.y !== this.player.lastMoveTarget.y)) {
            this.player.moveTarget = goPoint;
        }
    };
    return MechanicEngine;
})();
//# sourceMappingURL=mechanic-engine.js.map