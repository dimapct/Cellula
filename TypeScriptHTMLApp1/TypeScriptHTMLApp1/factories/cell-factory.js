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
            cell.coord = new Point(0, 0);
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
        this.builders[CellTypes.ENERGY] = function (data) {
            var cell = new EnergyCell(data);
            cell.image = new createjs.Shape();
            var color = "yellow";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
        this.builders[CellTypes.TOXIC] = function (data) {
            var cell = new ToxicCell(data);
            cell.image = new createjs.Shape();
            var color = "DeepPink";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
        this.builders[CellTypes.FAT] = function (data) {
            var cell = new FatCell(data);
            cell.image = new createjs.Shape();
            var color = "Bisque";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
        this.builders[CellTypes.RECEPTOR] = function (data) {
            var cell = new ReceptorCell(data);
            cell.image = new createjs.Shape();
            var color = "Indigo";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
        this.builders[CellTypes.BONE] = function (data) {
            var cell = new BoneCell(data);
            cell.image = new createjs.Shape();
            var color = "DarkGray";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
        this.builders[ServiceObjects.FAKECELL] = function (data) {
            var fakeCell = new FakeCell(new Object());
            fakeCell.image = new createjs.Shape();
            fakeCell.image.graphics.beginStroke("black").beginFill("lightgray").drawRect(0, 0, cellSize, cellSize);
            fakeCell.image.alpha = 0.3;
            fakeCell.image.name = "fakeeeeee";
            return fakeCell;
        };
    };
    return CellFactory;
})();
//# sourceMappingURL=cell-factory.js.map