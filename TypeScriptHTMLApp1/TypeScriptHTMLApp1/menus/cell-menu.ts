class CellMenu {
    stage: createjs.Stage;
    cellFactory: CellFactory;
    cellNameTextSize = 14;
    cellNameTextColor = "red";
    startPoint = new Point(10, 0);
    lineHeight = 30;
    cellTargetSize = 20;
    selectedCell: BaseCell;
    onCellAddStart: cellula.Event<BaseCell>;
    get CellAddStart(): cellula.IEvent<BaseCell> { return this.onCellAddStart; }

    constructor(canvas, cellFactory: CellFactory) {
        this.stage = new createjs.Stage(canvas);
        this.cellFactory = cellFactory;
        this.onCellAddStart = new cellula.Event<BaseCell>();
    }

    init(controlsManager: ControlsManager) {
        controlsManager.cellMenuStageClickHandlers.push(this.cellMenuStageClickHandler);
    }

    cellMenuStageClickHandler = (x: number, y: number) => {
        var lineContainer = this.stage.getObjectUnderPoint(x, y, 0);
        if (lineContainer) { 
            var selectedCell = this.cellFactory.createCell(lineContainer.id, new Object());
            selectedCell.image.regX = cellSize / 2;
            selectedCell.image.regY = cellSize / 2;
            this.onCellAddStart.trigger(selectedCell);
            this.selectedCell = selectedCell;
        }
    }

    update(mouseCanvasPosition, newRotation) {
        this.updateSelectedCell(mouseCanvasPosition, newRotation);
    }

    updateSelectedCell(mouseCanvasPosition: Point, newRotation) {
        if (this.selectedCell) { 
            this.selectedCell.image.x = mouseCanvasPosition.x;
            this.selectedCell.image.y = mouseCanvasPosition.y;
            if (this.selectedCell.image.rotation !== newRotation) {
                this.selectedCell.image.rotation = newRotation
            }
        }
    }

    stageLeaveHandler = () => {
        this.selectedCell.image.visible = false;
    }

    stageEnterHandler = () => {
        this.selectedCell.image.visible = true;
    }

    createCellMenu(cells: number[]) {
        var textX = this.startPoint.x + 30;
        var y = this.startPoint.y;

        var scaleFactor = this.cellTargetSize / cellSize;

        for (var i = 0; i < cells.length; i++) {
            var lineContainer = new createjs.Container();
            var fillShape = new createjs.Shape();
            fillShape.graphics.beginFill("white").drawRect(0, 0, 300, this.lineHeight);
            var cellType = cells[i];
            var cell = this.cellFactory.createCell(cellType, new Object());
            cell.image.scaleX = scaleFactor;
            cell.image.scaleY = scaleFactor;
            var text = new createjs.Text(CellTypes[cell.gameType], this.cellNameTextSize + "px Arial", this.cellNameTextColor);
            text.x = textX;
            cell.image.y = this.lineHeight / 6;
            text.y = this.lineHeight / 6;
            lineContainer.y = y;
            y += this.lineHeight;
            fillShape.id = cell.gameType;
            cell.image.id = cell.gameType;
            text.id = cell.gameType;
            lineContainer.addChild(fillShape, cell.image, text);
            this.stage.addChild(lineContainer);
        }
    }
}



// визначити обраний тип клітини, на який натиснено
// почати відображати клітину на миші
// підсвітити обрану клітину-кнопку в CellMenu
// показати можливі місця вставки клітини на організмі
// при кліку на можливе місце вставки вставити клітину
// перестати малювати клітину на миші
// перестати підсвічувати обрану клітину-кнопку в CellMenu