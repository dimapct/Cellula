class MechanicEngine {
    gameObjectFactory: any = new GameObjectFactory();
    gameObjects: any[] = [];

    createStartObjects() {
        var cell1 = this.gameObjectFactory.createGameObject(GameObjectTypes.POISON, new poisonData());
        var cell2 = this.gameObjectFactory.createGameObject(GameObjectTypes.BASE, new baseData());
        var cell3 = this.gameObjectFactory.createGameObject(GameObjectTypes.ENERGY, new energyData());
        var food1 = this.gameObjectFactory.createGameObject(GameObjectTypes.GLUCOSE, new glucoseData());
        this.gameObjects.push(cell1);
        this.gameObjects.push(cell2);
        this.gameObjects.push(cell3);
        this.gameObjects.push(food1);
    }

    update(t) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t);
        });

    }
}