class Tissue {
    id: string;
    cells: BaseCell[];
    shootingCells: BaseCell[];
    gameType: number;
    parentBeing: Being;

    constructor(cell: BaseCell, parent: Being) {
        this.id = Guid.newGuid();
        this.cells = [];
        this.addCell(cell);
        this.gameType = cell.gameType;
        this.shootingCells = [];
        this.parentBeing = parent;
    }

    addCell(cell: BaseCell) {
        cell.parentTissue = this;
        this.cells.push(cell);
    }

    shoot(mechanicEngine: MechanicEngine, stage) {
        if (this.shootingCells.length > 0) { 
            var calculatedShootDamage = this.cells.length * this.shootingCells[0].damage;
            this.shootingCells.forEach((cell) => { cell.shoot(mechanicEngine, calculatedShootDamage, stage); });
        }
    }

    updateShootingCells() {
        var shootingCells = [];
        this.cells.forEach(function (cell) {
            if (cell.upNeib.isEmptyCell || cell.downNeib.isEmptyCell || cell.leftNeib.isEmptyCell || cell.rightNeib.isEmptyCell) {
                shootingCells.push(cell);
            }
        });
        this.shootingCells = shootingCells;
    }


    update() {
        this.cells.forEach((c) => { c.update() });
    }
}