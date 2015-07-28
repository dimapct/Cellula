class MechanicEngine {
    cellFactory: CellFactory;
    beingFactory: BeingFactory;
    gameObjectFactory: GameObjectFactory;
    gameObjects: any[] = [];
    player: PlayerBeing;
    cellAdditionInProcess = false;
    cellsAvailableForPlayer: number[];
    fakeCell: FakeCell;
    fakeCells: FakeCell[];
    selectedCell: BaseCell;
    onCellAddEnd: cellula.Event<BaseCell>;
    get CellAddEnd(): cellula.IEvent<BaseCell> { return this.onCellAddEnd; }

    constructor() {
        this.cellsAvailableForPlayer = this.getAvailableCellsForPlayer();
        this.cellFactory = new CellFactory();
        this.gameObjectFactory = new GameObjectFactory();
        this.onCellAddEnd = new cellula.Event<BaseCell>();
        this.fakeCells = [];
        this.beingFactory = new BeingFactory(this.cellFactory);
        this.player = this.beingFactory.createBeing(BeingTypes.PLAYER, new playerData());
        var npc = this.beingFactory.createBeing(BeingTypes.NPC, new npcData());
        var food = this.gameObjectFactory.createGameObject(GameObjectTypes.FOOD, new foodData());
        this.gameObjects.push(npc);
        this.gameObjects.push(food);
    }

    createWorld() {
        this.createStartObjects();
    }

    subscribeToEvents(graphicsEngine: GraphicsEngine) {
        graphicsEngine.cellMenu.onCellAddStart.add(this.cellAddStartHandler);
    }

    cellAddStartHandler = (cell: BaseCell) => {
        this.selectedCell = cell;
        // in case user selects another cell and haven't planted the previous cell.
        if (this.cellAdditionInProcess) {
            this.onCellAddEnd.trigger(cell);
            this.removeAvailablePlacesCells();
        };
        this.createAvailablePlacesCells();
        this.cellAdditionInProcess = true;
    }

    cellAddEndHandler = (selectedPlace: Point) => {
        this.onCellAddEnd.trigger(this.selectedCell);
        this.removeAvailablePlacesCells();
        // re-create cell 
        this.selectedCell = this.cellFactory.createCell(this.selectedCell.gameType, new Object());
        this.selectedCell.coord = selectedPlace;
        this.player.addCell(this.selectedCell);
        this.cellAdditionInProcess = false;
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

    createAvailablePlacesCells() {
        var self = this;
        var availableNeibPlaces = this.player.getAvailableNeibPlaces();
        availableNeibPlaces.forEach(function (point) {
            var fakeCell: FakeCell = self.cellFactory.createCell(ServiceObjects.FAKECELL, new Object());
            fakeCell.coord = point;
            fakeCell.parentCallback = self.cellAddEndHandler;
            fakeCell.image.addEventListener("mousedown", fakeCell.mouseDownHandler);
            self.fakeCells.push(fakeCell);
            self.player.setNewCellPosition(fakeCell);
            self.player.image.addChild(fakeCell.image);
        });
    }

    removeAvailablePlacesCells() {
        var self = this;
        this.fakeCells.forEach(function (cell) { self.player.image.removeChild(cell.image); });
        this.fakeCells = [];
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

        var cell = this.cellFactory.createCell(cellType, new Object());

        // Get random AvailableNeibPlace
        var availableNeibPlaces = this.player.getAvailableNeibPlaces();
        var point = availableNeibPlaces[Math.floor(Math.random() * availableNeibPlaces.length)];

        cell.coord = point;
        this.player.addCell(cell);
    }
}