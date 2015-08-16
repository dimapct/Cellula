var BeingFactory = (function () {
    function BeingFactory(cellFactory) {
        this.builders = [];
        this.cellFactory = cellFactory;
        this.generateBuilders();
    }
    BeingFactory.prototype.createBeing = function (beingType, data, mechanicEngine) {
        return this.builders[beingType](data, mechanicEngine);
    };
    BeingFactory.prototype.generateBuilders = function () {
        var self = this;
        this.builders[BeingTypes.PLAYER] = function (data, mechanicEngine) {
            var core = self.cellFactory.createCell(CellTypes.CORE, CellDataTypes[CellTypes.CORE]);
            var being = new PlayerBeing(core, data, mechanicEngine);
            return being;
        };
        this.builders[BeingTypes.NPC] = function (data, mechanicEngine) {
            var core = self.cellFactory.createCell(CellTypes.CORE, CellDataTypes[CellTypes.CORE]);
            var image = new createjs.Shape();
            core.image.addChild(image);
            var being = new NPC(core, data, mechanicEngine);
            return being;
        };
    };
    return BeingFactory;
})();
//# sourceMappingURL=being-factory.js.map