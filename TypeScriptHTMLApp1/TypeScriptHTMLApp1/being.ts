class Being extends GameObject {
    cells: any[];

    constructor(data) {
        var self = this;
        super(data);
        this.cells = [];
        this.onboardCells(data.cells);
    }

    onboardCells(cells) {
        var self = this;
        cells.forEach(function (cell) {
            self.cells.push(cell);
            self.image.addChild(cell.image);
        });
    }

} 