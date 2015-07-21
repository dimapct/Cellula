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

    update(t: number, clientInputData: ReportContainer) {
        //
        if (clientInputData.spaceDownAddCell) {
            this.createRandomCell();
        }

        this.gameObjects.forEach(function (obj) {
            obj.update(t, clientInputData);
        });

        var goPoint = clientInputData.latestRightMouseClick;
        if (goPoint &&
            (goPoint.x !== this.player.moveTarget.x || goPoint.y !== this.player.moveTarget.y) &&
            (goPoint.x !== this.player.lastMoveTarget.x || goPoint.y !== this.player.lastMoveTarget.y)) {
            this.player.moveTarget = goPoint;
        }
    }
    //
    createRandomCell() { }
}