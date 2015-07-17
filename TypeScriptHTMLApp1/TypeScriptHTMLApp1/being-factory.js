var BeingFactory = (function () {
    function BeingFactory() {
        this.cellFactory = new CellFactory();
        this.builders = [];
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
            being.image.x = data.canvasPosition.x;
            being.image.y = data.canvasPosition.y;
            return being;
        };
    };
    return BeingFactory;
})();
//# sourceMappingURL=being-factory.js.map