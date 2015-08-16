class BaseCell {
    id: string;
    hp: number;
    hpMax: number;
    damage: number;
    muscleResistance: number;
    energyResistance: number;
    toxicResistance: number;
    parentTissue: Tissue;
    image: createjs.Container;
    gameType: number;
    neigbours: BaseCell[];
    upNeib: BaseCell;
    downNeib: BaseCell;
    leftNeib: BaseCell;
    rightNeib: BaseCell;
    damageRadius: number;
    size: number;
    gameRect: Rect;
    coord: Point;
    selectTissueParentHandler: { (tissue: Tissue): void };
    isAlive: boolean;
    isEmptyCell: boolean;

    constructor(data: any) {
        this.id = Guid.newGuid();
        this.gameType = data.gamType;
        this.hp = data.hp;
        this.hpMax = data.hp;
        this.damage = data.damage;
        this.muscleResistance = data.muscleResistance;
        this.energyResistance = data.energyResistance;
        this.toxicResistance = data.toxicResistance;
        this.image = new createjs.Container();
        this.size = data.size;
        this.gameRect = new Rect(0, 0, this.size, this.size);
        this.damageRadius = 50;
        this.isAlive = true;
        this.upNeib = data.emptyCell;
        this.downNeib = data.emptyCell;
        this.leftNeib = data.emptyCell;
        this.rightNeib = data.emptyCell;
    } 
    leftMouseClickHandler = (e: createjs.MouseEvent) => {
        if (e.nativeEvent.button === 0) {
            this.selectTissueParentHandler(this.parentTissue)
        }
    }

    shoot(mechanicEngine: MechanicEngine, damage: number, stage) {
        var position = this.gameRect.center;
        var damageSize = this.damageRadius * 2;
        var bullet = mechanicEngine.bulletFactory.createBullet(this.gameType, mechanicEngine, this.parentTissue.parentBeing, position, damageSize, damage);
        mechanicEngine.gameObjects.push(bullet);

        // for debug
        var bulletRect = new Rect(0, 0, damageSize, damageSize);
        bulletRect.center = this.gameRect.center;
        var shape = new createjs.Shape();
        shape.graphics.beginStroke("red").drawRect(bulletRect.x, bulletRect.y, damageSize, damageSize);
        stage.addChild(shape);
    }

    update() {
        this.gameRect.center = this.image.localToGlobal(this.size / 2, this.size / 2);
        this.checkIsAlive();

        // Animation of hp left
        this.image.alpha = this.hp / this.hpMax;
    }

    checkIsAlive() { if (this.hp <= 0) this.isAlive = false }
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
    shoot(mechanicEngine: MechanicEngine, damage: number, stage) { }
}

class ReceptorCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["RECEPTOR"];
    }
    shoot(mechanicEngine: MechanicEngine, damage: number, stage) { }
}

class BoneCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = CellTypes["BONE"];
    }
    shoot(mechanicEngine: MechanicEngine, damage: number, stage) { }
}

class FakeCell extends BaseCell {
    parentCallback: {(coord: Point)};
    constructor(data: any) {
        super(data);
        this.gameType = ServiceObjects["FAKECELL"];
    }

    mouseDownHandler = () => {
        this.parentCallback(this.coord);
    }
}

class EmptyCell extends BaseCell {
    constructor(data: any) {
        super(data);
        this.gameType = ServiceObjects["EMPTYCELL"];
        this.isEmptyCell = true;
    }

}