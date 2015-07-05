var GameObjectFactory = (function () {
    function GameObjectFactory() {
        this.builders = [];
        this.generateBuilders();
    }
    GameObjectFactory.prototype.createGameObject = function (objectType, data) {
        return this.builders[objectType](data);
    };
    GameObjectFactory.prototype.generateBuilders = function () {
        this.builders[CellTypes.BASE] = function (data) {
            var cell = new BaseCell(data);
            var shape = new createjs.Shape();
            var color = "green";
            var radius = data.width / 2;
            shape.graphics.beginFill(color).drawCircle(0, 0, radius);
            cell.image.addChild(shape);
            //cell.image.cache(-data.width / 2, -data.height / 2, data.width, data.height);
            return cell;
        };
        this.builders[CellTypes.ENERGY] = function (data) {
            var cell = new EnergyCell(data);
            var shape = new createjs.Shape();
            var color = "darkorange";
            var radius = data.width * 0.08;
            shape.graphics.beginFill(color).drawPolyStar(0, 0, radius, 20, 10, 0);
            cell.image.addChild(shape);
            //cell.image.cache(-data.width / 2, -data.height / 2, data.width, data.height);
            return cell;
        };
        this.builders[CellTypes.POISON] = function (data) {
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
        };
        this.builders[FoodTypes.GLUCOSE] = function (data) {
            var food = new Food(data);
            var shape = new createjs.Shape();
            var color = "lightyellow";
            var radius = food.energy / 10;
            shape.graphics.beginFill(color).drawCircle(0, 0, radius);
            food.image.addChild(shape);
            return food;
        };
    };
    return GameObjectFactory;
})();
//# sourceMappingURL=gameobject-factory.js.map