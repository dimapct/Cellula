class Being extends GameObject {
    tissues: Tissue[];
    moveTarget: Point;
    lastMoveTarget: Point;
    coreCellGameRect: createjs.Rectangle;
    activeTissues: Tissue[];

    constructor(coreCell, data) {
        super(data);
        this.tissues = [];
        this.activeTissues = [];
        this.setupCoreCell(coreCell, data.position);
        this.moveTarget = new Point(-1, -1);
        this.lastMoveTarget = new Point(-1, -1);
    }

    setupCoreCell(coreCell: BaseCell, gamePosition: Point) {
        coreCell.image.x = -cellSize / 2;
        coreCell.image.y = -cellSize / 2;
        this.image.addChild(coreCell.image);
        var tissue = new Tissue(coreCell);
        coreCell.parentTissue = tissue;
        tissue.shootingCells.push(coreCell);
        this.tissues.push(tissue);
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

    addNewCell(cell: BaseCell) {
        var self = this;
        var tissue = new Tissue(cell);

        cell.selectTissueParentHandler = this.selectTissueHandler;
        cell.image.addEventListener("mousedown", cell.leftMouseClickHandler);


        this.updateNeigbours(cell);
        var oldTissues: Tissue[] = this.getSameTypeNeigbourTissues(cell);


        oldTissues.forEach(function (tis: Tissue) {
            tis.cells.forEach((cell) => {
                cell.parentTissue = tissue;
            })
        });
        oldTissues.forEach(function (tis: Tissue) {
            tissue.cells = tissue.cells.concat(tis.cells);
        });

        this.updateTissueShootingCells(tissue);
        this.setNewCellPosition(cell);
        this.image.addChild(cell.image);
        // Remove old tissues
        oldTissues.forEach(function (oldTissue) { 
            self.tissues = self.tissues.filter(function (t) { return t.id !== oldTissue.id });
        });

        this.tissues.push(tissue);

    }

    updateTissueShootingCells(tissue: Tissue) {
        var shootingCells = [];
        tissue.cells.forEach(function (cell) {
            if (!cell.upNeib || !cell.downNeib || !cell.leftNeib || !cell.rightNeib) {
                shootingCells.push(cell);
            }
        });
        tissue.shootingCells = shootingCells;
    }

    updateNeigbours(newCell: BaseCell) {
        this.tissues.forEach(function (tissue) {
            tissue.cells.forEach((cell) => {
                if (cell.coord.equals(new Point(newCell.coord.x, newCell.coord.y + 1))) {
                    cell.upNeib = newCell;
                    newCell.downNeib = cell;
                }
                else if (cell.coord.equals(new Point(newCell.coord.x, newCell.coord.y - 1))) {
                    cell.downNeib = newCell;
                    newCell.upNeib = cell;
                }
                else if (cell.coord.equals(new Point(newCell.coord.x + 1, newCell.coord.y))) {
                    cell.leftNeib = newCell;
                    newCell.rightNeib = cell;
                }
                else if (cell.coord.equals(new Point(newCell.coord.x - 1, newCell.coord.y))) {
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
            if (neigb && neigb.gameType === cell.gameType && tissues.indexOf(neigb.parentTissue) === -1) {
                tissues.push(neigb.parentTissue);
            }
        });
        return tissues;
    }

    update(t: number, clientInputData) {
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

    getAvailableNeibPlaces(): Point[]{
        var availableNeibPlaces: Point[] = [];
        this.tissues.forEach(function (tissue) {
            tissue.cells.forEach((cell) => {
                if (cell.upNeib === undefined) {
                    availableNeibPlaces.push(new Point(cell.coord.x, cell.coord.y - 1));
                }
                if (cell.downNeib === undefined) {
                    availableNeibPlaces.push(new Point(cell.coord.x, cell.coord.y + 1));
                }
                if (cell.leftNeib === undefined) {
                    availableNeibPlaces.push(new Point(cell.coord.x - 1, cell.coord.y));
                }
                if (cell.rightNeib === undefined) {
                    availableNeibPlaces.push(new Point(cell.coord.x + 1, cell.coord.y));
                }
            });
        });
        return availableNeibPlaces;
    }

    //addCell(newCell: BaseCell) {
    //    this.cells.push(newCell);
    //    this.cells.forEach((cell) => {
    //        if (cell.coord.equals(new Point(newCell.coord.x, newCell.coord.y + 1))){
    //            cell.upNeib = newCell;
    //            newCell.downNeib = cell;
    //        }
    //        else if (cell.coord.equals(new Point(newCell.coord.x, newCell.coord.y - 1))){
    //            cell.downNeib = newCell;
    //            newCell.upNeib = cell;
    //        }
    //        else if (cell.coord.equals(new Point(newCell.coord.x + 1, newCell.coord.y))){
    //            cell.leftNeib = newCell;
    //            newCell.rightNeib = cell;
    //        }
    //        else if (cell.coord.equals(new Point(newCell.coord.x - 1, newCell.coord.y))){
    //            cell.rightNeib = newCell;
    //            newCell.leftNeib = cell;
    //        }
    //    });
    //    this.setNewCellPosition(newCell);
    //    this.image.addChild(newCell.image);
    //}

    setNewCellPosition(newCell) {
        var x = newCell.coord.x * cellSize - cellSize / 2;
        var y = newCell.coord.y * cellSize - cellSize / 2;
        newCell.image.x = x;
        newCell.image.y = y;
    }
} 

class PlayerBeing extends Being {
    constructor(coreCell, data) {
        super(coreCell, data);
    }
}