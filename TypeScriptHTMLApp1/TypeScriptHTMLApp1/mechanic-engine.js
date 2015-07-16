var MechanicEngine = (function () {
    function MechanicEngine() {
        this.beingFactory = new BeingFactory();
        this.gameObjects = [];
        this.player = this.beingFactory.createBeing(BeingTypes.PLAYER, new playerData());
        var npc = this.beingFactory.createBeing(BeingTypes.NPC, new npcData());
        this.gameObjects.push(npc);
    }
    MechanicEngine.prototype.createStartObjects = function () {
        this.gameObjects.push(this.player);
    };
    MechanicEngine.prototype.update = function (t, clientEventData) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t, clientEventData);
        });
        if (clientEventData &&
            (clientEventData.x !== this.player.moveTarget.x || clientEventData.y !== this.player.moveTarget.y) &&
            (clientEventData.x !== this.player.lastMoveTarget.x || clientEventData.y !== this.player.lastMoveTarget.y)) {
            this.player.moveTarget = clientEventData;
        }
    };
    return MechanicEngine;
})();
//# sourceMappingURL=mechanic-engine.js.map