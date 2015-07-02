class MechanicEngine {
    gameObjectFactory: any = new GameObjectFactory();
    cells: any[] = [];

    createStartCells() {
        var cell1 = this.gameObjectFactory.createGameObject(CellTypes.POISON, new poisonData());
        var cell2 = this.gameObjectFactory.createGameObject(CellTypes.BASE, new baseData());
        var cell3 = this.gameObjectFactory.createGameObject(CellTypes.ENERGY, new energyData());

        this.cells.push(cell1);
        this.cells.push(cell2);
        this.cells.push(cell3);
    }

    update(t) {
        this.cells.forEach(function (cell) {
            cell.update(1);
        });
    }
}