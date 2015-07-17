var CellFactory = (function () {
    function CellFactory() {
        this.builders = [];
        this.generateBuilders();
    }
    CellFactory.prototype.createCell = function (cellType, data) {
        return this.builders[cellType](data);
    };
    CellFactory.prototype.generateBuilders = function () {
        var self = this;
        this.builders[CellTypes.CORE] = function (data) {
            var cell = new CoreCell(data);
            cell.image = new createjs.Shape();
            var color = "black";
            cell.image.graphics.beginFill(color).drawRect(0, 0, cellSize, cellSize);
            cell.image.graphics.beginFill("orange").drawCircle(cellSize / 2, cellSize / 2, cellSize / 4);
            return cell;
        };
        this.builders[CellTypes.MUSCLE] = function (data) {
            var cell = new MuscleCell(data);
            cell.image = new createjs.Shape();
            var color = "darkred";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
    };
    return CellFactory;
})();
//# sourceMappingURL=cell-factory.js.map