class MechanicEngine {
    beingFactory: any = new BeingFactory();
    gameObjectFactory: any = new GameObjectFactory();
    gameObjects: any[] = [];
    player: PlayerBeing;

    constructor() {
        this.player = this.beingFactory.createBeing(BeingTypes.PLAYER, new playerData());
        var npc = this.beingFactory.createBeing(BeingTypes.NPC, new npcData());
        var food = this.gameObjectFactory.createGameObject(GameObjectTypes.FOOD, new foodData());
        this.gameObjects.push(npc);
        this.gameObjects.push(food);
    }

    createStartObjects() {
        this.gameObjects.push(this.player);
    }

    update(t: number, clientEventData: Point) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t, clientEventData);
        });

        if (clientEventData &&
            (clientEventData.x !== this.player.moveTarget.x || clientEventData.y !== this.player.moveTarget.y) &&
            (clientEventData.x !== this.player.lastMoveTarget.x || clientEventData.y !== this.player.lastMoveTarget.y)) {
            this.player.moveTarget = clientEventData;
        }
            
        

    }
}