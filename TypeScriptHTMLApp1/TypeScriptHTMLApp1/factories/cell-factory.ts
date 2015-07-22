class CellFactory {
    builders: any[];

    constructor() {
        this.builders = [];
        this.generateBuilders();
    }

    createCell(cellType, data): BaseCell {
        return this.builders[cellType](data);
    }
    
    generateBuilders() {
        var self = this;
        this.builders[CellTypes.CORE] = function (data: any) {
            var cell = new CoreCell(data);
            cell.coord = new Point(0, 0);
            cell.image = new createjs.Shape();
            var color = "black";
            cell.image.graphics.beginFill(color).drawRect(0, 0, cellSize, cellSize);
            cell.image.graphics.beginFill("orange").drawCircle(cellSize / 2, cellSize / 2, cellSize / 4);
            return cell;
        };

        this.builders[CellTypes.MUSCLE] = function (data: any) {
            var cell = new MuscleCell(data);
            cell.image = new createjs.Shape();
            var color = "darkred";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };

        this.builders[CellTypes.ENERGY] = function (data: any) {
            var cell = new EnergyCell(data);
            cell.image = new createjs.Shape();
            var color = "yellow";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };

        this.builders[CellTypes.TOXIC] = function (data: any) {
            var cell = new ToxicCell(data);
            cell.image = new createjs.Shape();
            var color = "DeepPink";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };

        this.builders[CellTypes.FAT] = function (data: any) {
            var cell = new FatCell(data);
            cell.image = new createjs.Shape();
            var color = "Bisque";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };

        this.builders[CellTypes.RECEPTOR] = function (data: any) {
            var cell = new ReceptorCell(data);
            cell.image = new createjs.Shape();
            var color = "Indigo";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };

        this.builders[CellTypes.BONE] = function (data: any) {
            var cell = new BoneCell(data);
            cell.image = new createjs.Shape();
            var color = "DarkGray";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, cellSize, cellSize);
            return cell;
        };
    }
} 