class BaseCell {
    image: any;

    upNeib: BaseCell;
    downNeib: BaseCell;
    leftNeib: BaseCell;
    rightNeib: BaseCell;

    coord: Point;

    constructor(data: any) {
    } 
}

class EnergyCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class MuscleCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class PoisonCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class CoreCell extends BaseCell {
    constructor(data: any) { super(data); }
}