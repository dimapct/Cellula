class CellFactory {
    builders: any[];
    cellSize: number;

    constructor() {
        this.builders = [];
        this.cellSize = 20;
        this.generateBuilders();
    }

    createCell(cellType, data) {
        return this.builders[cellType](data);
    }
    
    generateBuilders() {
        var self = this;
        this.builders[CellTypes.MUSCLE] = function (data: any) {
            var cell = new MuscleCell(data);
            cell.image = new createjs.Shape();
            var color = "darkred";
            cell.image.graphics.beginStroke("black").beginFill(color).drawRect(0, 0, self.cellSize, self.cellSize);
            //cell.image.x = data.position.x;
            //cell.image.y = data.position.y;
            return cell;
        };

        this.builders[CellTypes.ENERGY] = function (data: any) {
            var cell = new EnergyCell(data);
            var shape = new createjs.Shape();
            var color = "darkorange";
            var radius: number = data.width * 0.08;
            shape.graphics.beginFill(color).drawPolyStar(0, 0, radius, 20, 10, 0);
            cell.image.addChild(shape);
            //cell.image.cache(-data.width / 2, -data.height / 2, data.width, data.height);
            return cell;
        };

        this.builders[CellTypes.POISON] = function (data: any) {
            var cell = new BaseCell(data);
            var shape = new createjs.Shape();
            var color = "purple";
            var radius = data.width / 3;
            var startX = 0;
            var startY = 0;
            shape.graphics.beginFill(color).arc(startX, startY - radius / 2, radius, 0, Math.PI * 2, false);
            shape.graphics.beginFill(color).arc(startX, startY + radius / 2, radius, 0, Math.PI * 2, false);
            shape.graphics.beginFill(color).arc(startX - radius / 2, startY, radius, 0, Math.PI * 2, false);
            shape.graphics.beginFill(color).arc(startX + radius / 2, startY, radius, 0, Math.PI * 2, false);
            cell.image.addChild(shape);
            
            //cell.image.cache(-data.width / 2, -data.height / 2, data.width, data.height);
            return cell;
        }
    }
} 