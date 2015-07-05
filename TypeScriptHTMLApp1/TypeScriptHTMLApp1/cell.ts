class BaseCell extends GameObject {
    constructor(data: any) { super(data); }

    move(t: number) {
        this.gameRect.center = new Point(this.gameRect.center.x + this.speed * t * this.dir.x,
                                         this.gameRect.center.y + this.speed * t * this.dir.y);
    }
}

class EnergyCell extends BaseCell {
    constructor(data: any) { super(data); }
}