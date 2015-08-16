class Being extends GameObject {
    cells: BaseCell[];
    tissues: Tissue[];
    moveTarget: Point;
    lastMoveTarget: Point;
    coreCellGameRect: createjs.Rectangle;
    coreCell: CoreCell;
    activeTissues: Tissue[];
    mechanicEngine: MechanicEngine

    constructor(coreCell, data, mechanicEngine: MechanicEngine) {
        super(data);
        this.cells = [];
        this.tissues = [];
        this.activeTissues = [];
        this.mechanicEngine = mechanicEngine;
        this.setupCoreCell(coreCell, data.position);
        this.moveTarget = new Point(-1, -1);
        this.lastMoveTarget = new Point(-1, -1);
    }
    update(t: number, clientInputData?) {
        this.checkIsAlive();
        this.tissues.forEach((tissue) => { tissue.update() });
        this.removeDeadCellsAndTissues();
    }
    shoot = () => { }
    setupCoreCell(coreCell: BaseCell, gamePosition: Point) {
        this.coreCell = coreCell;
        this.addNewCell(coreCell);
        this.activeTissues.push(this.tissues[0]);
    }
    addNewCell(cell: BaseCell) {
        // The approach is that we always create new tissue and pump "old" tissues' cells into new tissue

        var self = this;
        var tissue = new Tissue(cell, this);
        this.cells.push(cell);

        // Set event handlers
        this.setCellEventsHandlers(cell);

        // Update cell's neighbours and cell's neighbours' neighbours
        this.updateNeigbours(cell);

        // 
        var oldTissues: Tissue[] = this.getSameTypeNeigbourTissues(cell);

        // Update parentTissue links for the existing cells
        oldTissues.forEach(function (tis: Tissue) {
            tis.cells.forEach((cell) => {
                cell.parentTissue = tissue;
            })
        });

        oldTissues.forEach(function (tis: Tissue) {
            tissue.cells = tissue.cells.concat(tis.cells);
        });

        this.setNewCellPosition(cell);
        this.image.addChild(cell.image);
        // Remove old tissues
        oldTissues.forEach(function (oldTissue) { 
            self.tissues = self.tissues.filter(function (t) { return t.id !== oldTissue.id });
        });
        this.tissues.push(tissue);
        this.tissues.forEach( (t) => { t.updateShootingCells(); })
    }
    updateNeigbours(newCell: BaseCell) {
        this.tissues.forEach(function (tissue) {
            tissue.cells.forEach((cell) => {
                if (Point.equals(cell.coord, new Point(newCell.coord.x, newCell.coord.y + 1))) {
                    cell.upNeib = newCell;
                    newCell.downNeib = cell;
                }
                else if (Point.equals(cell.coord, new Point(newCell.coord.x, newCell.coord.y - 1))) {
                    cell.downNeib = newCell;
                    newCell.upNeib = cell;
                }
                else if (Point.equals(cell.coord, new Point(newCell.coord.x + 1, newCell.coord.y))) {
                    cell.leftNeib = newCell;
                    newCell.rightNeib = cell;
                }
                else if (Point.equals(cell.coord, new Point(newCell.coord.x - 1, newCell.coord.y))) {
                    cell.rightNeib = newCell;
                    newCell.leftNeib = cell;
                }
            });
        });
        
    }
    getSameTypeNeigbourTissues(cell: BaseCell) {
        var tissues = [];
        var neigbours = [cell.downNeib, cell.leftNeib, cell.rightNeib, cell.upNeib];
        neigbours.forEach(function (neigb) {
            if (neigb.gameType === cell.gameType && tissues.indexOf(neigb.parentTissue) === -1) {
                tissues.push(neigb.parentTissue);
            }
        });
        return tissues;
    }
    getAvailableNeibPlaces(): Point[]{
        var availableNeibPlaces: Point[] = [];
        this.tissues.forEach(function (tissue) {
            tissue.cells.forEach((cell) => {
                if (cell.upNeib.isEmptyCell) {
                    availableNeibPlaces.push(new Point(cell.coord.x, cell.coord.y - 1));
                }
                if (cell.downNeib.isEmptyCell) {
                    availableNeibPlaces.push(new Point(cell.coord.x, cell.coord.y + 1));
                }
                if (cell.leftNeib.isEmptyCell) {
                    availableNeibPlaces.push(new Point(cell.coord.x - 1, cell.coord.y));
                }
                if (cell.rightNeib.isEmptyCell) {
                    availableNeibPlaces.push(new Point(cell.coord.x + 1, cell.coord.y));
                }
            });
        });
        return availableNeibPlaces;
    }
    setNewCellPosition(newCell: BaseCell) {
        var x = newCell.coord.x * newCell.gameRect.width - newCell.gameRect.width / 2;
        var y = newCell.coord.y * newCell.gameRect.height - newCell.gameRect.height / 2;
        newCell.image.x = x;
        newCell.image.y = y;
    }
    setCellEventsHandlers(cell: BaseCell) {
        cell.selectTissueParentHandler = this.selectTissueHandler;
        cell.image.addEventListener("mousedown", cell.leftMouseClickHandler);
    }
    selectTissueHandler = (selectedTissue: Tissue) => {
        var self = this;
        // Remove previous tissue selection
        self.activeTissues.forEach((tissue) => {
            tissue.cells.forEach((cell) => {
                cell.image.filters = [];
                cell.image.updateCache();
            });
        });
        // Remove previous selected tissues 
        self.activeTissues = [];

        // Highlight cells of selected tissue
        selectedTissue.cells.forEach(function (cell) {
            cell.image.filters = [new createjs.ColorFilter(1, 1, 1, 0.5, 0, 0, 0, 0)];
            cell.image.updateCache();
        });
        self.activeTissues.push(selectedTissue);
    }
    checkIsAlive() { if (!this.coreCell.isAlive) this.isAlive = false }
    removeDeadCellsAndTissues() {
        if (this.isAlive) {
            var self = this;
            this.cells.forEach((cell) => {
                if (!cell.isAlive) {
                    // update nighbourgs
                    var emptyCell = new EmptyCell(new Object());
                    cell.upNeib.downNeib = emptyCell;
                    cell.downNeib.upNeib = emptyCell;
                    cell.leftNeib.rightNeib = emptyCell;
                    cell.rightNeib.leftNeib = emptyCell;

                    // Remove image
                    self.image.removeChild(cell.image);

                    // Remove cell from all lists
                    self.cells = self.cells.filter((c) => { return c.id !== cell.id })
                    cell.parentTissue.cells = cell.parentTissue.cells.filter((c) => { return c.id !== cell.id })
                    cell.parentTissue.shootingCells = cell.parentTissue.shootingCells.filter((c) => { return c.id !== cell.id })

                    // Remove tissue, if it was only 1 cell in it
                    if (cell.parentTissue.cells.length === 0) {
                        self.tissues.filter((tissue) => { return tissue.id !== cell.parentTissue.id });
                        self.activeTissues.filter((tissue) => { return tissue.id !== cell.parentTissue.id });
                    }
                }
            });
        }
    }
} 

class PlayerBeing extends Being {
    constructor(coreCell, data, mechanicEngine: MechanicEngine) {
        super(coreCell, data, mechanicEngine);
    }

    shoot = () => {
        var self = this;
        this.activeTissues.forEach((tissue) => { tissue.shoot(self.mechanicEngine, self.image.stage); });
    }
    update(t: number, clientInputData) {
        super.update(t, clientInputData);
        this.move(t);
        this.rotate(clientInputData);
    }
    move(t: number) {
        if(this.moveTarget.x !== -1 && this.moveTarget.y !== -1) {
            var moveResult = this.moveToTarget(t);
            // If target is reached, remove it.
            if (moveResult === 1) {
                this.completeTarget();
            }
        }
    }
    moveToTarget(t: number) {
        var current: Point = this.gameRect.center;
        var distanceToTarget = Vector.fromPoints(current, this.moveTarget).length();

        if (distanceToTarget > this.speed * t) {
            var directionVector = new Vector(this.moveTarget.x - this.image.x, this.moveTarget.y - this.image.y);
            var directionUnitVector = directionVector.calculateUnitVector();

            var distanceX = this.speed * t * directionUnitVector.x;
            var distanceY = this.speed * t * directionUnitVector.y;

            this.gameRect.center = new Point(this.gameRect.center.x + distanceX, this.gameRect.center.y + distanceY);
            // Target is not reached.
            return 0;
        }
        else {
            this.gameRect.center = this.moveTarget;
            // Target is reached.
            return 1;
        }

    }
    completeTarget() {
        this.lastMoveTarget = this.moveTarget;
        this.moveTarget = new Point(-1, -1);
    }
    rotate(rotationInputs) { 
        this.image.rotation -= rotationInputs.leftRotationDuration / 1000 * this.rotationSpeed;
        this.image.rotation += rotationInputs.rightRotationDuration / 1000 * this.rotationSpeed;
    }
}