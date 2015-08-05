class BaseCell {
    parentTissue: Tissue;
    image: any;
    id: number;
    gameType: number;
    neigbours: BaseCell[];
    upNeib: BaseCell;
    downNeib: BaseCell;
    leftNeib: BaseCell;
    rightNeib: BaseCell;

    coord: Point;

    constructor(data: any) {
        //this.neigbours.push(this.leftNeib, this.rightNeib, this.upNeib, this.downNeib);
    } 
}

class CoreCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["CORE"];
    }
}

class EnergyCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["ENERGY"];
    }
}

class MuscleCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["MUSCLE"];
    }
}

class ToxicCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["TOXIC"];
    }
}

class FatCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["FAT"];
    }
}

class ReceptorCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["RECEPTOR"];
    }
}

class BoneCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["BONE"];
    }
}

class FakeCell extends BaseCell {
    parentCallback: {(coord: Point)};
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["FAKE"];
    }

    mouseDownHandler = () => {
        this.parentCallback(this.coord);
    }
}