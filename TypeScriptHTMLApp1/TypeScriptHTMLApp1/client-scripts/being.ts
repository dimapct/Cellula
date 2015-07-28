class Being extends GameObject {
    cells: BaseCell[];
    moveTarget: Point;
    lastMoveTarget: Point;
    coreCell: CoreCell;
    coreCellGameRect: createjs.Rectangle;

    constructor(coreCell, data) {
        var self = this;
        super(data);
        this.cells = [];
        this.setupCoreCell(coreCell, data.position);
        this.moveTarget = new Point(-1, -1);
        this.lastMoveTarget = new Point(-1, -1);
    }

    setupCoreCell(coreCell, gamePosition) {
        this.coreCell = coreCell;
        this.coreCellGameRect = new createjs.Rectangle(gamePosition.x - cellSize / 2, gamePosition.y - cellSize / 2, cellSize, cellSize);
        this.coreCell.image.x = -cellSize / 2;
        this.coreCell.image.y = -cellSize / 2;
        this.cells.push(coreCell);
        this.image.addChild(this.coreCell.image);
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
        var availableNeibPlaces: Array<Point> = [];
        this.cells.forEach((cell) => {
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
        
        return availableNeibPlaces;
    }

    addCell(newCell: BaseCell) {
        this.cells.push(newCell);
        this.cells.forEach((cell) => {
            if (cell.coord.equals(new Point(newCell.coord.x, newCell.coord.y + 1))){
                cell.upNeib = newCell;
                newCell.downNeib = cell;
            }
            else if (cell.coord.equals(new Point(newCell.coord.x, newCell.coord.y - 1))){
                cell.downNeib = newCell;
                newCell.upNeib = cell;
            }
            else if (cell.coord.equals(new Point(newCell.coord.x + 1, newCell.coord.y))){
                cell.leftNeib = newCell;
                newCell.rightNeib = cell;
            }
            else if (cell.coord.equals(new Point(newCell.coord.x - 1, newCell.coord.y))){
                cell.rightNeib = newCell;
                newCell.leftNeib = cell;
            }
        });
        this.setNewCellPosition(newCell);
        this.image.addChild(newCell.image);
    }

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