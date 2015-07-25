class MechanicEngine {
    cellFactory: CellFactory;
    beingFactory: BeingFactory;
    gameObjectFactory: any = new GameObjectFactory();
    gameObjects: any[] = [];
    player: PlayerBeing;
    cellsAvailableForPlayer: number[];

    constructor() {
        this.cellsAvailableForPlayer = this.getAvailableCellsForPlayer();
        this.cellFactory = new CellFactory();
        this.beingFactory = new BeingFactory(this.cellFactory);
        this.player = this.beingFactory.createBeing(BeingTypes.PLAYER, new playerData());
        var npc = this.beingFactory.createBeing(BeingTypes.NPC, new npcData());
        var food = this.gameObjectFactory.createGameObject(GameObjectTypes.FOOD, new foodData());
        this.gameObjects.push(npc);
        this.gameObjects.push(food);
    }

    createStartObjects() {
        this.gameObjects.push(this.player);
    }

    getAvailableCellsForPlayer() {
        var availableCells = [];
        var keys = Object.keys(CellTypes);
        availableCells = keys.slice(1, keys.length / 2);
        return availableCells;
    }

    update(t: number, clientInputData: ReportContainer) {
        if (!(clientInputData.menuSelection === "")) {
            console.log(clientInputData.menuSelection);
        }

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
    
    createRandomCell() {
        // Get random cellType from enum CellTypes
        var keys = Object.keys(CellTypes);
        keys = keys.slice(keys.length / 2);
        var cellType = CellTypes.CORE;
        while (cellType == CellTypes.CORE) { 
            var index = Math.floor(Math.random() * keys.length);
            cellType = CellTypes[keys[index]];
        }

        var cell = this.cellFactory.createCell(cellType, new muscleData());

        // Get random AvailableNeibPlace
        var availableNeibPlaces = this.player.getAvailableNeibPlaces();
        var point = availableNeibPlaces[Math.floor(Math.random() * availableNeibPlaces.length)];

        cell.coord = point;
        this.player.addCell(cell);
    }
}