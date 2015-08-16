class BeingFactory {
    builders: any[];
    cellFactory: CellFactory;

    constructor(cellFactory: CellFactory) {
        this.builders = [];
        this.cellFactory = cellFactory;
        this.generateBuilders();
    }

    createBeing(beingType, data, mechanicEngine: MechanicEngine) {
        return this.builders[beingType](data, mechanicEngine);
    }

    generateBuilders() {
        var self = this;
        this.builders[BeingTypes.PLAYER] = function (data: any, mechanicEngine: MechanicEngine) { 
            var core = self.cellFactory.createCell(CellTypes.CORE, CellDataTypes[CellTypes.CORE]);
            var being = new PlayerBeing(core, data, mechanicEngine);
            return being;
        }

        this.builders[BeingTypes.NPC] = function (data: any, mechanicEngine: MechanicEngine) {
            var core = self.cellFactory.createCell(CellTypes.CORE, CellDataTypes[CellTypes.CORE]);
            var image = new createjs.Shape();
            core.image.addChild(image);
            var being = new NPC(core, data, mechanicEngine);
            return being;
        }
    }
}