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

class CoreCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class EnergyCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class MuscleCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class ToxicCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class FatCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class ReceptorCell extends BaseCell {
    constructor(data: any) { super(data); }
}

class BoneCell extends BaseCell {
    constructor(data: any) { super(data); }
}