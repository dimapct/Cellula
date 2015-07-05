class MechanicEngine {
    gameObjectFactory: any = new GameObjectFactory();
    gameObjects: any[] = [];

    createStartCells() {
        var cell1 = this.gameObjectFactory.createGameObject(CellTypes.POISON, new poisonData());
        var cell2 = this.gameObjectFactory.createGameObject(CellTypes.BASE, new baseData());
        var cell3 = this.gameObjectFactory.createGameObject(CellTypes.ENERGY, new energyData());

        this.gameObjects.push(cell1);
        this.gameObjects.push(cell2);
        this.gameObjects.push(cell3);
    }

    createStartFood() {
        var food1 = this.gameObjectFactory.createGameObject(FoodTypes.GLUCOSE, new glucoseData());
        this.gameObjects.push(food1);
    }

    update(t) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t);
        });

    }
}