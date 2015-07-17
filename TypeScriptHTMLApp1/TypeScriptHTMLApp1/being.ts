class Being extends GameObject {
    cells: any[];
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

    onboardCells(cells) {
        var self = this;
        cells.forEach(function (cell) {
            self.cells.push(cell);
            self.image.addChild(cell.image);
        });
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

} 

class PlayerBeing extends Being {
    constructor(coreCell, data) {
        super(coreCell, data);
    }
}