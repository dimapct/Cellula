var BeingFactory = (function () {
    function BeingFactory(cellFactory) {
        this.builders = [];
        this.cellFactory = cellFactory;
        this.generateBuilders();
    }
    BeingFactory.prototype.createBeing = function (beingType, data) {
        return this.builders[beingType](data);
    };
    BeingFactory.prototype.generateBuilders = function () {
        var self = this;
        this.builders[BeingTypes.PLAYER] = function (data) {
            var core = self.cellFactory.createCell(CellTypes.CORE, new coreData());
            var being = new PlayerBeing(core, data);
            return being;
        };
        this.builders[BeingTypes.NPC] = function (data) {
            var core = self.cellFactory.createCell(CellTypes.CORE, new coreData());
            core.image.graphics.beginFill("green").drawCircle(cellSize / 2, cellSize / 2, cellSize / 4);
            var being = new PlayerBeing(core, data);
            return being;
        };
    };
    return BeingFactory;
})();
//# sourceMappingURL=being-factory.js.map