class Bullet {
    id: any;
    gameRect: Rect;
    damage: number;
    gameType: string;
    image: any;
    parent: Being;
    lifeDuration: number;
    isAlive: boolean;
    creationTime: number;
    mechanicEngine: MechanicEngine;
    weapon: BaseWeapon;

    constructor(mechanicEngine: MechanicEngine, parent: Being, position: Point, size: number, damage: number, lifeDuration: number = 0) {
        this.mechanicEngine = mechanicEngine;
        this.parent = parent;
        this.gameRect = new Rect(0, 0, size, size);
        this.gameRect.center = position;
        this.damage = damage;
        this.image = new createjs.Container();
        this.lifeDuration = lifeDuration;
        this.isAlive = true;
        this.creationTime = new Date().getTime();

    }

    update() {
        var hitCells = this.getHitTargetCells();
        this.hit(hitCells);
        this.checkIsAlive();
    }

    hit(hitCells) {
        this.weapon.hit(hitCells, this.damage);
    }

    setWeapon(weapon: BaseWeapon) {
        this.weapon = weapon;
    }

    getHitTargetCells() {
        var self = this;
        // Get array of target cells
        var allCells: BaseCell[] = [];
        var targetBeings: Being[] = this.mechanicEngine.gameObjects.filter((gameObject) => { return gameObject instanceof NPC });
        targetBeings.forEach((being) => { allCells = allCells.concat(being.cells); });
        // Get collisioned cells
        var hitCells: BaseCell[] = [];
        allCells.forEach((cell) => {
            if (cell.gameRect.intersects(self.gameRect)) hitCells.push(cell);
        });
        return hitCells;
    }

    checkIsAlive() {
        var now = new Date().getTime();
        if (now - this.creationTime > this.lifeDuration) this.isAlive = false;
    }
}