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
            var image = new createjs.Shape();
            var color = "black";
            image.graphics.beginFill(color).drawRect(0, 0, data.size, data.size);
            image.graphics.beginFill("orange").drawCircle(data.size / 2, data.size / 2, data.size / 4);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.damageRadius = coreDamageRadius;
            cell.size = data.size;
            return cell;
        };
        this.builders[CellTypes.MUSCLE] = function (data) {
            var cell = new MuscleCell(data);
            var image = new createjs.Shape();
            var color = "darkred";
            image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, data.size, data.size);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.damageRadius = muscleDamageRadius;
            cell.size = data.size;
            return cell;
        };
        this.builders[CellTypes.ENERGY] = function (data) {
            var cell = new EnergyCell(data);
            var image = new createjs.Shape();
            var color = "yellow";
            image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, data.size, data.size);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.damageRadius = energyDamageRadius;
            cell.size = data.size;
            return cell;
        };
        this.builders[CellTypes.TOXIC] = function (data) {
            var cell = new ToxicCell(data);
            var image = new createjs.Shape();
            var color = "DeepPink";
            image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, data.size, data.size);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.damageRadius = toxicDamageRadius;
            cell.size = data.size;
            return cell;
        };
        this.builders[CellTypes.FAT] = function (data) {
            var cell = new FatCell(data);
            var image = new createjs.Shape();
            var color = "Bisque";
            image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, data.size, data.size);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.size = data.size;
            return cell;
        };
        this.builders[CellTypes.RECEPTOR] = function (data) {
            var cell = new ReceptorCell(data);
            var image = new createjs.Shape();
            var color = "Indigo";
            image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, data.size, data.size);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.size = data.size;
            return cell;
        };
        this.builders[CellTypes.BONE] = function (data) {
            var cell = new BoneCell(data);
            var image = new createjs.Shape();
            var color = "DarkGray";
            image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, data.size, data.size);
            cell.image.addChild(image);
            cell.image.cache(0, 0, data.size, data.size);
            cell.size = data.size;
            return cell;
        };
        this.builders[ServiceObjects.FAKECELL] = function (data) {
            var fakeCell = new FakeCell(data);
            var image = new createjs.Shape();
            image.graphics.beginStroke("black").beginFill("lightgray").drawRect(0, 0, data.size, data.size);
            fakeCell.image.alpha = 0.3;
            fakeCell.image.name = "fakeeeeee";
            fakeCell.image.addChild(image);
            return fakeCell;
        };
    };
    return CellFactory;
})();
//# sourceMappingURL=cell-factory.js.map