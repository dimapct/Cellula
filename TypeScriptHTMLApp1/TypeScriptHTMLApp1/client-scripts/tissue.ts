class Tissue {
    id: string;
    cells: BaseCell[];
    shootingCells: BaseCell[];
    gameType: number;

    constructor(cell: BaseCell) {
        this.id = Guid.newGuid();
        this.cells = [];
        this.addCell(cell);
        this.gameType = cell.gameType;
        this.shootingCells = [];

    }

    addCell(cell: BaseCell) {
        cell.parentTissue = this;
        this.cells.push(cell);
    }

    update() { }
}