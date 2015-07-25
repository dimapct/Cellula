class BaseCell {
    image: any;
    gameType: string;
    upNeib: BaseCell;
    downNeib: BaseCell;
    leftNeib: BaseCell;
    rightNeib: BaseCell;

    coord: Point;

    constructor(data: any) {
    } 
}

class CoreCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Core";
    }
}

class EnergyCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Energy";
    }
}

class MuscleCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Muscle";
    }
}

class ToxicCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Toxic";
    }
}

class FatCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Fat";
    }
}

class ReceptorCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Receptor";
    }
}

class BoneCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = "Bone";
    }
}