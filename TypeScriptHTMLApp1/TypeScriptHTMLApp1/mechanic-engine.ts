class MechanicEngine {
    cellFactory: any = new CellFactory();
    gameObjects: any[] = [];

    createStartObjects() {
        var cell1 = this.cellFactory.createCell(CellTypes.MUSCLE, new muscleData());
        var bData = new beingData();
        bData.cells.push(cell1);
        var being = new Being(bData);
        this.gameObjects.push(being);
    }

    update(t) {
        this.gameObjects.forEach(function (obj) {
            obj.update(t);
        });

    }
}